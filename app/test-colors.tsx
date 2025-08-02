export default function TestColors() {
  return (
    <div className="bg-creme min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-marrom text-3xl font-bold mb-6">
          Teste das Cores - Vital Life Food
        </h1>

        <div className="space-y-4">
          <div className="card">
            <h2 className="text-verde text-xl font-semibold mb-2">
              Fundo Branco (Card)
            </h2>
            <p className="text-marrom">
              Este card tem fundo branco e texto marrom.
            </p>
          </div>

          <div className="bg-verde p-4 rounded-lg">
            <h2 className="text-branco text-xl font-semibold mb-2">
              Fundo Verde
            </h2>
            <p className="text-branco">
              Este elemento tem fundo verde e texto branco.
            </p>
          </div>

          <div className="bg-verde-claro p-4 rounded-lg">
            <h2 className="text-marrom text-xl font-semibold mb-2">
              Fundo Verde Claro
            </h2>
            <p className="text-marrom">
              Este elemento tem fundo verde claro e texto marrom.
            </p>
          </div>

          <button className="btn-primary">Botão Verde</button>
        </div>
      </div>
    </div>
  );
}
