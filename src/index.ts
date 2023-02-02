import { nip19 } from "nostr-tools";

const names = {
  aliez: "0bf2ea7e7ab82b853ffe12576710739be21b85f417cfd2366be211eae387da8f",
  roy: "256acd567eaa553e3796ff45b3ba06bbdf2f4124dcddf8fea1cc29c668e24a0a",
};

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (
      url.pathname === "/.well-known/nostr.json" &&
      typeof url.searchParams.has("name")
    ) {
      const name = url.searchParams.get("name")!;
      if (names[name]) {
        return new Response(JSON.stringify({ names: { [name]: names[name] } }));
      }
      if (name.startsWith("npub")) {
        return new Response(
          JSON.stringify({ name: { [name]: nip19.decode(name).data } })
        );
      }
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 404 });
  },
};
