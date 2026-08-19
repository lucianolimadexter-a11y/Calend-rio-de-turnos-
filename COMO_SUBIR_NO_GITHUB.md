# Como subir esse app no GitHub (passo a passo)

## 1. Criar o repositório
1. Entre em https://github.com e faça login (ou crie uma conta).
2. Clique no `+` no canto superior direito → **New repository**.
3. Dê um nome, por exemplo `calendario-turnos`.
4. Deixe como **Public** (necessário pro GitHub Pages gratuito).
5. NÃO marque "Add a README" (você já tem um). Clique em **Create repository**.

## 2. Subir os arquivos
Se você já tem um repositório existente com `manifest.json`, `icon-192.png` e `sw.js`
(o app usa esses arquivos), basta substituir o `index.html` por este novo.
Se está começando do zero, coloque nesta pasta os arquivos que faltam
(`manifest.json`, `icon-192.png`, `sw.js`) antes de subir.

### Opção A — pelo site do GitHub (mais fácil, sem instalar nada)
1. Dentro do repositório criado, clique em **Add file → Upload files**.
2. Arraste os arquivos desta pasta (`index.html`, `capa.png`, `README.md` e os demais).
3. Role para baixo, escreva uma mensagem tipo "primeira versão" e clique em **Commit changes**.

### Opção B — pelo terminal (git)
```bash
cd caminho/da/pasta/repo-calendario
git init
git add .
git commit -m "primeira versão"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/calendario-turnos.git
git push -u origin main
```

## 3. Ativar o GitHub Pages (pra acessar como site/app)
1. No repositório, vá em **Settings** → **Pages** (menu lateral esquerdo).
2. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
3. Clique em **Save**.
4. Espere 1-2 minutos. O link do app vai aparecer nessa mesma página, algo como:
   `https://SEU_USUARIO.github.io/calendario-turnos/`

## 4. Atualizações futuras
Toda vez que eu te mandar uma nova versão do `index.html`, é só repetir o passo 2
(subir o arquivo substituindo o antigo) — o GitHub Pages atualiza sozinho em
alguns minutos.
