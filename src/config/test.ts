let cookies: string = "";

export function saveCookies(res: any) {
  cookies = res.headers["set-cookie"]
    .map((c: string) => c.split(";")[0])
    .join("; ");
}

export function getCookies() {
  return cookies;
}