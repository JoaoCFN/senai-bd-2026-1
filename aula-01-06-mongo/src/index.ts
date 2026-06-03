import { MongoClient } from 'mongodb';

const uri = "mongodb://admin:ds_bd_001@localhost:27017";
const client = new MongoClient(uri);

async function setupProject() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!\n");

    const db = client.db("ecommerce");
    const catalogo = db.collection("produtos");

    await catalogo.deleteMany({});

    console.log("Inserindo produtos com esquemas completamente diferentes...");
    
    await catalogo.insertMany([
      {
        categoria: "Eletrônico",
        nome: "Smart TV LG",
        preco: 3000,
        especificacoes: {
          resolucao: "4K",
          polegadas: 55,
          smart: true
        }
      },
      {
        categoria: "Vestuário",
        nome: "Camiseta Básica",
        preco: 50,
        especificacoes: {
          tamanho: "M",
          cor: "Preta",
          tecido: "Algodão"
        },
        tags: ["verão", "casual"]
      },
      {
        categoria: "Livro",
        nome: "Clean Code",
        preco: 120,
        especificacoes: {
          autor: "Robert C. Martin",
          paginas: 425
        }
      }
    ]);
    console.log("Produtos inseridos com sucesso!\n");

    console.log("Buscando todos os produtos que custam menos de R$ 150 (Filtro numérico):");
    const produtosBaratos = await catalogo.find({ preco: { $lt: 150 } }).toArray();
    console.log(produtosBaratos);
    console.log("\n");

    console.log("A mágica do NoSQL: Buscando dentro do objeto aninhado (Dot Notation)");
    console.log("Buscando produtos que o tamanho seja 'M' (ignora TVs e Livros):");
    const produtosTamanhoM = await catalogo.find({ "especificacoes.tamanho": "M" }).toArray();
    console.log(produtosTamanhoM);
    console.log("\n");

    console.log("Buscando dentro de Arrays:");
    console.log("Buscando itens que contenham a tag 'casual':");
    const produtosCasuais = await catalogo.find({ tags: "casual" }).toArray();
    console.log(produtosCasuais);

  } catch (erro) {
    console.error("Erro:", erro);
  } finally {
    await client.close();
    console.log("\nConexão encerrada.");
  }
}

setupProject();