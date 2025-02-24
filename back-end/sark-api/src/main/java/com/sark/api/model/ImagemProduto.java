package com.sark.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "imagens_produto") // Nome correto conforme o banco de dados
public class ImagemProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    @JsonIgnore // Evita recursão infinita
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "id_variacao")
    @JsonIgnore // Evita recursão infinita
    private VariacaoProduto variacao;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public VariacaoProduto getVariacao() {
        return variacao;
    }

    public void setVariacao(VariacaoProduto variacao) {
        this.variacao = variacao;
    }
}
