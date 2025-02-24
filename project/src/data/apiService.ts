const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Função para tratar a resposta
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }

  // Verifica se a resposta possui conteúdo antes de fazer o parsing
  const text = await response.text();
  return text ? JSON.parse(text) : null; // Retorna null caso não haja conteúdo
};


// Usuário
export const fetchUsuarios = async () => handleResponse(await fetch(`${API_BASE_URL}/usuarios`));
export const createUsuario = async (usuario: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
  );
export const updateUsuario = async (id: string, usuario: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
  );
export const deleteUsuario = async (id: string) => handleResponse(await fetch(`${API_BASE_URL}/usuarios/${id}`, { method: "DELETE" }));

// Endereço do Usuário
export const fetchEnderecosByUsuario = async (usuarioId: string) =>
  handleResponse(await fetch(`${API_BASE_URL}/enderecos/usuario/${usuarioId}`));
export const createEndereco = async (endereco: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/enderecos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(endereco),
    })
  );

// Produto
export const fetchProdutos = async () => handleResponse(await fetch(`${API_BASE_URL}/produtos`));
export const fetchProdutoById = async (id: string) => handleResponse(await fetch(`${API_BASE_URL}/produtos/${id}`));
export const createProduto = async (produto: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
  );
export const updateProduto = async (id: string, produto: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
  );
export const deleteProduto = async (id: string) => handleResponse(await fetch(`${API_BASE_URL}/produtos/${id}`, { method: "DELETE" }));

// Pedido
export const fetchPedidosByUsuario = async (idUsuario: string) => handleResponse(await fetch(`${API_BASE_URL}/pedidos/usuario/${idUsuario}`));
export const createPedido = async (pedido: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    })
  );
export const updateStatusPedido = async (id: string, status: string) =>
  handleResponse(await fetch(`${API_BASE_URL}/pedidos/${id}/status?status=${status}`, { method: "PUT" }));
export const deletePedido = async (id: string) => handleResponse(await fetch(`${API_BASE_URL}/pedidos/${id}`, { method: "DELETE" }));

// Itens do Pedido
export const fetchItensByPedido = async (idPedido: string) => handleResponse(await fetch(`${API_BASE_URL}/itens-pedido/pedido/${idPedido}`));
export const createItemPedido = async (itemPedido: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/itens-pedido`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemPedido),
    })
  );
export const deleteItemPedido = async (id: string) => handleResponse(await fetch(`${API_BASE_URL}/itens-pedido/${id}`, { method: "DELETE" }));

// Cálculo de Frete
export const calcularFrete = async (dadosFrete: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/calculo-frete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosFrete),
    })
  );

// Envio
export const buscarEnvioPedido = async (pedidoId: string) => handleResponse(await fetch(`${API_BASE_URL}/envios/pedido/${pedidoId}`));
export const criarEnvioPedido = async (envio: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/envios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(envio),
    })
  );
// Variação do Produto
export const updateVariacaoProduto = async (id: string, variacao: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/variacoes-produto/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variacao),
    })
  );

export const createVariacaoProduto = async (variacao: any) =>
  handleResponse(
    await fetch(`${API_BASE_URL}/variacoes-produto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variacao),
    })
  );

