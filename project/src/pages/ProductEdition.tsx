import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, DollarSign, X, Sliders } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import {
  fetchProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
  updateVariacaoProduto,
  createVariacaoProduto,
} from '../data/apiService';

export interface ImagemProduto {
  url: string;
}

export interface VariacaoProduto {
  id?: number;
  cor: string;
  tamanho: string;
  material: string;
  preco: number;
  estoque: number;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  variacoes: VariacaoProduto[];
  imagens: ImagemProduto[];
}

type ModalMode = 'add' | 'edit' | 'addVariation' | 'editVariation' | null;

export default function ProductEdition() {
  const [showModal, setShowModal] = useState<ModalMode>(null);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [formData, setFormData] = useState<Omit<Produto, 'id' | 'variacoes' | 'imagens'>>({
    nome: '',
    descricao: '',
    categoria: '',
    preco: 0,
  });
  const [preco, setPreco] = useState<number>(0);
  const [imagemUrl, setImagemUrl] = useState<string>('');

  const [selectedProdutoIdForNewVar, setSelectedProdutoIdForNewVar] = useState<number | null>(null);
  const [newVarData, setNewVarData] = useState<VariacaoProduto>({
    cor: '',
    tamanho: '',
    material: '',
    preco: 0,
    estoque: 0,
  });

  const [selectedProdutoForVar, setSelectedProdutoForVar] = useState<Produto | null>(null);
  const [editVarData, setEditVarData] = useState<VariacaoProduto>({
    cor: '',
    tamanho: '',
    material: '',
    preco: 0,
    estoque: 0,
  });

  useEffect(() => {
    fetchProdutos()
      .then((data) => {
        const produtosFormatados = data.map((produto: Produto) => ({
          ...produto,
          variacoes: Array.from(produto.variacoes || []),
          imagens: Array.from(produto.imagens || []),
        }));
        setProdutos(produtosFormatados);
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  const resetForm = () => {
    setFormData({ nome: '', descricao: '', categoria: '', preco: 0 });
    setPreco(0);
    setImagemUrl('');
    setSelectedProduto(null);
    setShowModal(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const produtoData = {
      id: selectedProduto?.id || 0, // Define o ID ou 0 caso seja undefined
      nome: formData.nome,
      descricao: formData.descricao,
      categoria: formData.categoria,
      preco: preco,
      variacoes: selectedProduto?.variacoes || [],
      imagens: [{ url: imagemUrl }]
    };

    try {
      if (selectedProduto?.id) {
        const produtoAtualizado = await updateProduto(selectedProduto.id.toString(), produtoData);
        setProdutos(produtos.map((p) => (p.id === selectedProduto?.id ? produtoAtualizado : p)));
      } else {
        const novoProduto = await createProduto(produtoData);
        setProdutos([...produtos, novoProduto]);
      }
      resetForm();
    } catch (error) {
      console.error('Erro ao atualizar ou criar produto:', error);
    }
  };



  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    setFormData({
      nome: produto.nome || '',
      descricao: produto.descricao || '',
      categoria: produto.categoria || '',
      preco: produto.preco || 0,
    });
    setPreco(produto.variacoes && produto.variacoes.length > 0 ? produto.variacoes[0].preco || 0 : 0);
    setImagemUrl(produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url || '' : '');
    setShowModal('edit');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduto(id.toString());
        setProdutos(produtos.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const handleAddVariation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProdutoIdForNewVar) return;

    try {
      const newVar = await createVariacaoProduto({
        ...newVarData,
        produto: { id: selectedProdutoIdForNewVar },
      });

      setProdutos(
        produtos.map((prod) =>
          prod.id === selectedProdutoIdForNewVar
            ? { ...prod, variacoes: [...prod.variacoes, newVar] }
            : prod
        )
      );

      setShowModal(null);
      setNewVarData({
        cor: '',
        tamanho: '',
        material: '',
        preco: 0,
        estoque: 0,
      });
    } catch (error) {
      console.error('Erro ao adicionar variação:', error);
    }
  };

  const handleEditVariation = (produto: Produto, variacao: VariacaoProduto) => {
    setSelectedProdutoForVar(produto);
    setEditVarData(variacao);
    setShowModal('editVariation');
  };

  const handleEditVariationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProdutoForVar || !editVarData.id) return;

    try {
      const updatedVar = await updateVariacaoProduto(editVarData.id.toString(), editVarData);

      setProdutos(
        produtos.map((prod) =>
          prod.id === selectedProdutoForVar.id
            ? {
              ...prod,
              variacoes: prod.variacoes.map((v) =>
                v.id === editVarData.id ? updatedVar : v
              ),
            }
            : prod
        )
      );

      setShowModal(null);
    } catch (error) {
      console.error('Erro ao editar variação:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center m-4 space-x-4">
        <button
          onClick={() => setShowModal('add')}
          className="group relative flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all"
        >
          <Plus className="h-6 w-6 mr-2 transition-transform group-hover:rotate-90" />
          Adicionar Produto
        </button>

        <button
          onClick={() => setShowModal('addVariation')}
          className="group relative flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-md shadow-lg hover:from-green-600 hover:to-teal-600 transition-all"
        >
          <Plus className="h-6 w-6 mr-2 transition-transform group-hover:rotate-90" />
          Adicionar Variação
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
                {produto.variacoes.map((variacao) => (
                  <button
                    key={variacao.id}
                    onClick={() => handleEditVariation(produto, variacao)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Sliders className="h-4 w-4 text-green-600" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Adição/Edição de Produto */}
        {showModal && (showModal === 'add' || showModal === 'edit') && (
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="text"
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

        {/* Modal de Adição de Variação */}
        {showModal === 'addVariation' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <h2 className="text-2xl font-semibold mb-6">Adicionar Variação</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                <select
                  value={selectedProdutoIdForNewVar || ''}
                  onChange={(e) => setSelectedProdutoIdForNewVar(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                  required
                >
                  <option value="">Selecione um produto</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleAddVariation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                  <input
                    type="text"
                    value={newVarData.cor}
                    onChange={(e) => setNewVarData({ ...newVarData, cor: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho</label>
                  <input
                    type="text"
                    value={newVarData.tamanho}
                    onChange={(e) => setNewVarData({ ...newVarData, tamanho: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={newVarData.material}
                    onChange={(e) => setNewVarData({ ...newVarData, material: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newVarData.preco}
                      onChange={(e) => setNewVarData({ ...newVarData, preco: Number(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
                    <input
                      type="number"
                      value={newVarData.estoque}
                      onChange={(e) => setNewVarData({ ...newVarData, estoque: Number(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Adicionar Variação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Edição de Variação */}
        {showModal === 'editVariation' && selectedProdutoForVar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              <h2 className="text-2xl font-semibold mb-6">Editar Variação</h2>

              {/* Dropdown para selecionar a variação */}
              {selectedProdutoForVar.variacoes.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selecione a Variação</label>
                  <select
                    value={editVarData.id ? editVarData.id.toString() : ""}
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      const selectedVar = selectedProdutoForVar.variacoes.find((v) => v.id === selectedId);

                      if (selectedVar) {
                        setEditVarData({
                          id: selectedVar.id,
                          cor: selectedVar.cor || '',
                          tamanho: selectedVar.tamanho || '',
                          material: selectedVar.material || '',
                          preco: selectedVar.preco || 0,
                          estoque: selectedVar.estoque || 0,
                        });
                      }
                    }}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                    required
                  >
                    <option value="">Selecione uma variação</option>
                    {selectedProdutoForVar.variacoes.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.cor || "Sem cor"} - {v.tamanho || "Sem tamanho"} - {v.material || "Sem material"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Formulário de Edição da Variação */}
              <form onSubmit={handleEditVariationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                  <input
                    type="text"
                    value={editVarData.cor}
                    onChange={(e) => setEditVarData({ ...editVarData, cor: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho</label>
                  <input
                    type="text"
                    value={editVarData.tamanho}
                    onChange={(e) => setEditVarData({ ...editVarData, tamanho: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={editVarData.material}
                    onChange={(e) => setEditVarData({ ...editVarData, material: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editVarData.preco}
                      onChange={(e) => setEditVarData({ ...editVarData, preco: Number(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
                    <input
                      type="number"
                      value={editVarData.estoque}
                      onChange={(e) => setEditVarData({ ...editVarData, estoque: Number(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Salvar Variação
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
