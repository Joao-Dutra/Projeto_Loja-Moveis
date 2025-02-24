import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, DollarSign, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import {
  fetchProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from '../data/apiService';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  variacoes: { preco: number }[];
  imagens: { url: string }[];
}

type ModalMode = 'add' | 'edit' | null;

export default function FurniturePage() {
  const [showModal, setShowModal] = useState<ModalMode>(null);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Como o modelo do Produto não possui "estoque" diretamente (você pode incluir se necessário),
  // aqui usamos somente os campos existentes: nome, descricao, categoria, variacoes e imagens.
  // Se o estoque for necessário, ajuste o modelo no backend e na interface aqui.

  // Para o formulário, usaremos estados separados para os campos principais, preço e URL da imagem.
  const [formData, setFormData] = useState<Omit<Produto, 'id' | 'variacoes' | 'imagens'>>({
    nome: '',
    descricao: '',
    categoria: '',
  });
  const [preco, setPreco] = useState<number>(0);
  const [imagemUrl, setImagemUrl] = useState<string>('');

  // Carrega os produtos do banco de dados ao montar o componente
  useEffect(() => {
    fetchProdutos()
      .then((data) => setProdutos(data))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      categoria: '',
    });
    setPreco(0);
    setImagemUrl('');
    setSelectedProduto(null);
    setShowModal(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Monta o objeto de produto conforme o modelo do backend
    const produtoData: Omit<Produto, 'id'> = {
      ...formData,
      variacoes: [{ preco }],
      imagens: [{ url: imagemUrl }],
    };

    if (showModal === 'add') {
      try {
        const novoProduto = await createProduto(produtoData);
        setProdutos([...produtos, novoProduto]);
      } catch (error) {
        console.error('Erro ao criar produto:', error);
      }
    } else if (showModal === 'edit' && selectedProduto) {
      try {
        const produtoAtualizado = await updateProduto(selectedProduto.id.toString(), produtoData);

        setProdutos(
          produtos.map((p) =>
            p.id === selectedProduto.id ? produtoAtualizado : p
          )
        );
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
      }
    }
    resetForm();
  };

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      categoria: produto.categoria,
    });
    // Considera a primeira variação e a primeira imagem (se existirem)
    setPreco(produto.variacoes && produto.variacoes.length > 0 ? produto.variacoes[0].preco : 0);
    setImagemUrl(produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : '');
    setShowModal('edit');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        // Converte o id para string antes de chamar a função deleteProduto
        await deleteProduto(id.toString());
        setProdutos(produtos.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setShowModal('add')}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors m-4"
      >
        <Plus className="h-5 w-5 mr-2" />
        Adicionar Produto
      </button>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtos.map((produto) => (
            <div key={produto.id} className="relative">
              <ProductCard product={produto} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(produto)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Pencil className="h-4 w-4 text-indigo-600" />
                </button>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Adição/Edição de Produto */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <h2 className="text-2xl font-semibold mb-6">
                {showModal === 'add' ? 'Adicionar Novo Produto' : 'Editar Produto'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        value={preco}
                        onChange={(e) => setPreco(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {showModal === 'add' ? 'Adicionar' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
