import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-blue-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Inventory Pro
            </h1>
            <p className="text-blue-700 text-lg">
              Gestão de inventário inteligente e simples
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <Link
              href="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="w-full flex justify-center py-3 px-4 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Criar Conta
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-blue-600 text-sm">
              Gerencie produtos, acompanhe o inventário e otimize operações
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
