export default function NotFound() {
  return (
    <div className="p-10 text-center max-w-[600px] mx-auto">
      <h1 className="text-red-600 mb-5">
        404 - Página Não Encontrada
      </h1>
      <p className="text-lg mb-5">
        Desculpe, não foi possível encontrar o documento ou página solicitada.
      </p>
      <div className="mt-8">
        <p>Sugestões:</p>
        <ul className="list-none p-0 mt-4">
          <li>• Verifique se o endereço foi digitado corretamente</li>
          <li>• Confirme se você tem permissão para acessar este documento</li>
          <li>• O documento pode ter sido movido ou excluído</li>
        </ul>
      </div>
      <button 
        onClick={() => window.history.back()} 
        className="mt-8 px-5 py-2.5 bg-blue-600 text-white border-none rounded hover:bg-blue-700 cursor-pointer"
      >
        Voltar à página anterior
      </button>
    </div>
  );
}
