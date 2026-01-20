export class Masks {
  public email(email: string): string {
    const [user, dominio] = email.split("@");
    const show = user.slice(0, 2);
    const hidden = "*".repeat(user.length - 2);
    return `${show}${hidden}@${dominio}`;
  }
}