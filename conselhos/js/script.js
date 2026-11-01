const adviceIdElement = document.getElementById('advice-id');
const adviceTextElement = document.getElementById('advice-text');
const btnNext = document.getElementById('btn-next');

// Função para traduzir do inglês (en) para o português (pt-br)
async function translateToPortuguese(text) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-br`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Retorna o texto traduzido se a requisição for bem-sucedida
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Erro na tradução:", error);
    return text; // Caso falhe, retorna o texto original em inglês
  }
}

async function getAdvice() {
  try {
    btnNext.disabled = true;
    adviceTextElement.textContent = "Carregando conselho...";

    const response = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error("Erro ao buscar conselho.");
    }

    const data = await response.json();
    const advice = data.slip;

    adviceIdElement.textContent = `CONSELHO #${advice.id}`;
    
    // Mostra indicação de tradução antes de renderizar na tela
    adviceTextElement.textContent = "Traduzindo...";
    const translatedAdvice = await translateToPortuguese(advice.advice);

    adviceTextElement.textContent = `"${translatedAdvice}"`;
  } catch (error) {
    adviceTextElement.textContent = "Ops! Não foi possível carregar um conselho agora.";
    console.error(error);
  } finally {
    btnNext.disabled = false;
  }
}