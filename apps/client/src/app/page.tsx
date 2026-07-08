export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[560px] flex-col items-center justify-center px-7 text-center">
      <span className="font-serif text-xl font-semibold">DULEME AND CIE</span>
      <h1 className="mt-6 font-serif text-2xl font-semibold sm:text-[28px]">
        Votre espace est privé.
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-mut">
        Vous y accédez par le lien personnel que Téféry vous a transmis.
        Si vous ne le retrouvez pas, écrivez-nous à{" "}
        <a
          href="mailto:dulemeandcie@hotmail.com"
          className="text-accent underline-offset-2 hover:underline"
        >
          dulemeandcie@hotmail.com
        </a>
        .
      </p>
    </main>
  );
}
