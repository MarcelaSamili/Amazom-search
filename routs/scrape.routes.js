import { Router } from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const scrapeRouter = Router();

scrapeRouter.get('/', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res
      .status(400)
      .json({ error: 'Por favor, forneça uma palavra-chave na URL.' });
  }

  try {
    // Espera 3 segundos antes de continuar para evitar bloqueios
    await new Promise(resolve => setTimeout(resolve, 3000));
    // URL da Amazon (substitua pelo domínio correto da Amazon do seu país)
    const amazonUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(
      keyword
    )}`;

    // Fazendo a requisição para a Amazon
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    ];

    const response = await axios.get(amazonUrl, {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        Referer: 'https://www.amazon.com.br/',
      },
    });

    const dom = new JSDOM(response.data);
    if (response.data.includes('robot check')) {
      console.log('CAPTCHA detectado! Amazon bloqueou a requisição.');
    }

    const document = dom.window.document;

    let products = [];

    // Selecionando os elementos de cada produto
    document.querySelectorAll('.s-main-slot .s-result-item').forEach(item => {
      const title =
        item.querySelector('a h2 span')?.textContent?.trim() ||
        item.querySelector('a h2')?.textContent?.trim() ||
        'Título não encontrado';

      const rating =
        item.querySelector('.a-icon-alt')?.textContent?.split(' ')[0] ||
        'Sem avaliações';

      const reviews =
        item.querySelector('div.a-section a span.a-size-base.s-underline-text')
          ?.textContent || '0';

      const image = item.querySelector('.s-image')?.src || 'Sem imagem';

      products.push({ title, rating, reviews, image });
    });

    res.json({ keyword, products });
  } catch (error) {
    console.error('Erro ao buscar dados da Amazom:', error.message);
    res.status(500).json({
      error: 'Erro ao buscar os dados da Amazon.',
      details: error.message,
    });
  }
});

export default scrapeRouter;
