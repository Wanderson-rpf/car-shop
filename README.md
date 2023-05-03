
# :red_car: Car Shop :motorcycle:

Projeto realizado no curso de desenvolvimento web da Trybe, neste criei uma API para gerenciamento de veículos de uma concessionaria, nesta é possível cadastrar veículos (carro e moto), editar, consultar e excluir.




## Stack utilizada

- Node
- Express
- TypeScript
- Mongoose
- SOLID
- Rest
- Chai
- Sinon
- Eslint


## Documentação da API

## :red_car: Rotas para /cars

#### Criar um novo registro de carro

```http
POST /cars
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `model` | `string` | **Obrigatório**. contendo modelo do veículo |
| `year` | `number` | **Obrigatório**. contendo ano de fabricação do veículo |
| `color` | `string` | **Obrigatório**. contendo cor principal do veículo |
| `status` | `boolean` | **Opcional**. contendo status que define se um veículo pode ou não ser comprado (este atributo deve ser opcional e se não passado, deve ser false) |
| `buyValue` | `number` | **Obrigatório**. contendo valor de compra do veículo |
| `doorsQty` | `number` | **Obrigatório**. contendo quantidade de portas de um carro |
| `seatsQty` | `number` | **Obrigatório**. contendo quantidade de assentos de um carro |

<details><summary>Exemplo de Entrada:</summary></br>

```json
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```

</details>

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"id": "64526028a356aa9a1a6fafe0",
	"model": "Marea",
	"year": 2002,
	"color": "Black",
	"status": true,
	"buyValue": 15.99,
	"doorsQty": 4,
	"seatsQty": 5
}
```

</details>

#### Consulta todos os registros de carros

```http
GET /cars
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
	{
		"id": "64526028a356aa9a1a6fafe0",
		"model": "Marea",
		"year": 2002,
		"color": "Black",
		"status": true,
		"buyValue": 15.99,
		"doorsQty": 4,
		"seatsQty": 5
	}
]
```

</details>

#### Consulta um registro pelo ID.

```http
GET /cars/:id
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"id": "64526028a356aa9a1a6fafe0",
	"model": "Marea",
	"year": 2002,
	"color": "Black",
	"status": true,
	"buyValue": 15.99,
	"doorsQty": 4,
	"seatsQty": 5
}
```

Em caso de erro (status 404):
```json
{
    "message": "Car not found"
}
```

Em caso de erro (status 422):
```json
{
    "message": "Invalid mongo id"
}
```

</details>

#### Edita um registro pelo ID.

```http
PUT /cars/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `model` | `string` | **Obrigatório**. contendo modelo do veículo |
| `year` | `number` | **Obrigatório**. contendo ano de fabricação do veículo |
| `color` | `string` | **Obrigatório**. contendo cor principal do veículo |
| `status` | `boolean` | **Opcional**. contendo status que define se um veículo pode ou não ser comprado (este atributo deve ser opcional e se não passado, deve ser false) |
| `buyValue` | `number` | **Obrigatório**. contendo valor de compra do veículo |
| `doorsQty` | `number` | **Obrigatório**. contendo quantidade de portas de um carro |
| `seatsQty` | `number` | **Obrigatório**. contendo quantidade de assentos de um carro |

<details><summary>Exemplo de Entrada:</summary></br>

```json
{
  "model": "novo Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```

</details>

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"id": "6452819ba356aa9a1a6faff7",
	"model": "novo Marea",
	"year": 1992,
	"color": "Red",
	"status": true,
	"buyValue": 12,
	"doorsQty": 2,
	"seatsQty": 5
}
```

Em caso de erro (status 404):
```json
{
    "message": "Car not found"
}
```

Em caso de erro (status 422):
```json
{
    "message": "Invalid mongo id"
}
```

</details>

#### Deleta um registro pelo ID.

```http
DELETE /cars/:id
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"message": "Car register deleted."
}
```

Em caso de erro (status 404):
```json
{
    "message": "Car not found"
}
```

Em caso de erro (status 422):
```json
{
    "message": "Invalid mongo id"
}
```

</details>


## :motorcycle: Rotas para /motorcycles

#### Criar um novo registro de moto

```http
POST /motorcycles
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `model` | `string` | **Obrigatório**. contendo modelo do veículo |
| `year` | `number` | **Obrigatório**. contendo ano de fabricação do veículo |
| `color` | `string` | **Obrigatório**. contendo cor principal do veículo |
| `status` | `boolean` | **Opcional**. contendo status que define se um veículo pode ou não ser comprado (este atributo deve ser opcional e se não passado, deve ser false) |
| `buyValue` | `number` | **Obrigatório**. contendo valor de compra do veículo |
| `category` | `string` | **Obrigatório**. contendo categoria da moto (opções: Street, Custom ou Trail) |
| `engineCapacity` | `number` | **Obrigatório**. contendo capacidade do motor |

<details><summary>Exemplo de Entrada:</summary></br>

```json
{
    "model": "Honda Cb 600f Hornet",
    "year": 2005,
    "color": "Yellow",
    "status": true,
    "buyValue": 30.000,
    "category": "Street",
    "engineCapacity": 600
}
```

</details>

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
    "id": "645282d0a356aa9a1a6faffc",
    "model": "Honda Cb 600f Hornet",
    "year": 2005,
    "color": "Yellow",
    "status": true,
    "buyValue": 30,
    "category": "Street",
    "engineCapacity": 600
}
```

</details>

#### Consulta todos os registros de carros

```http
GET /motorcycles
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
[
	{
		"id": "645282d0a356aa9a1a6faffc",
		"model": "Honda Cb 600f Hornet",
		"year": 2005,
		"color": "Yellow",
		"status": true,
		"buyValue": 30,
		"category": "Street",
		"engineCapacity": 600
	}
]
```

</details>

#### Consulta um registro pelo ID.

```http
GET /motorcycles/:id
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"id": "645282d0a356aa9a1a6faffc",
	"model": "Honda Cb 600f Hornet",
	"year": 2005,
	"color": "Yellow",
	"status": true,
	"buyValue": 30,
	"category": "Street",
	"engineCapacity": 600
}
```

Em caso de erro (status 404):
```json
{
    "message": "Motorcycle not found"
}
```

Em caso de erro (status 422):
```json
{
    "message": "Invalid mongo id"
}
```

</details>

#### Edita um registro pelo ID.

```http
PUT /motorcycles/:id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `model` | `string` | **Obrigatório**. contendo modelo do veículo |
| `year` | `number` | **Obrigatório**. contendo ano de fabricação do veículo |
| `color` | `string` | **Obrigatório**. contendo cor principal do veículo |
| `status` | `boolean` | **Opcional**. contendo status que define se um veículo pode ou não ser comprado (este atributo deve ser opcional e se não passado, deve ser false) |
| `buyValue` | `number` | **Obrigatório**. contendo valor de compra do veículo |
| `category` | `string` | **Obrigatório**. contendo categoria da moto (opções: Street, Custom ou Trail) |
| `engineCapacity` | `number` | **Obrigatório**. contendo capacidade do motor |

<details><summary>Exemplo de Entrada:</summary></br>

```json
{
	"model": "nova Honda Cb 600f Hornet",
	"year": 2023,
	"color": "red",
	"status": true,
	"buyValue": 30,
	"category": "Street",
	"engineCapacity": 600
}
```

</details>

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"id": "645282d0a356aa9a1a6faffc",
	"model": "nova Honda Cb 600f Hornet",
	"year": 2023,
	"color": "red",
	"status": true,
	"buyValue": 30,
	"category": "Street",
	"engineCapacity": 600
}
```

Em caso de erro (status 404):
```json
{
    "message": "Motorcycle not found"
}
```

Em caso de erro (status 422):
```json
{
    "message": "Invalid mongo id"
}
```

</details>

#### Deleta um registro pelo ID.

```http
DELETE /cars/:id
```

<details><summary>Exemplo de retorno:</summary></br>

Em caso de sucesso (status 200):
```json
{
	"message": "Motorcycle register deleted."
}
```

Em caso de erro (status 404):
```json
{
    "message": "Motorcycle not found"
}
```

Em caso de erro (status 422):
```json
{
    "message": "Invalid mongo id"
}
```

</details>


## :wrench: Instalação

Utilização via docker, siga os passos abaixo.

1. Clone do repositório do projeto

```bash
git clone git@github.com:Wanderson-rpf/car-shop.git
```

2. Criando container usando o docker compose.
Na pasta clonada, tem o arquivo docker-compose.yml

```bash
docker-compose up -d --build
```

    
## Testes

Foi feito testes unitarios para cobrir todas as camadas da API.

![image](https://user-images.githubusercontent.com/62866832/235984015-ebca0e8c-b4e5-4e5c-828a-b69064cdcc9e.png)

Para rodar os testes de cobertura, pelo terminal, acesse o diretório onde esta o projeto e execute o comando abaixo.

```bash
  npm run test:coverage
```


## 🖇️ Contribuindo

Contribuições são sempre bem-vindas!

Para colaborar com o projeto realize o fork, caso tenha alguma dúvida, segue 
um link com tutorial.
[Tutorial de como realizar um fork](https://guides.github.com/activities/forking/).
- Após fazer o fork, clone o repositório criado para o seu computador.
- Rode o comando `npm install`.


## :man_technologist: Feito por
- [Wanderson Ricardo](https://www.linkedin.com/in/wanderson-ricardo-dev/)

