import axios from 'axios';

interface InfoCoin {
  name: string;
  avgPrice: number;
}

const getStr = (str: string, length: number) => {
  const count = length - str.length;
  let result = str;
  for (let i = 0; i < count; i++) {
    result += '⠀';
  }
  return result;
};

const formatList = (list: InfoCoin[]) => {
  let str = '';
  list.forEach((item: InfoCoin) => {
    str += `⠀🔐 /${item.name} \n⠀💸 ${item.avgPrice.toFixed(2)}$\n-----------------\n`;
  });
  return str;
};

interface CoinPrice {
  time: string;
  price: number;
}

interface CoinPrices {
  name: string;
  prices: CoinPrice[];
}

const getTime = (str: string) => {
  const symbol = str.slice(-1);
  if (str === '1m') return '1 minure ago:';
  if (str === '1h') return '1 hour ago:';
  if (symbol === 'm') return `${str.slice(0, -1)} minutes ago:`;
  if (symbol === 'h') return `${str.slice(0, -1)} hours ago:`;
  return str;
};

const formatInfos = (list: CoinPrices) => {
  let str = `🔐 /${list.name} by past 24 hours:\n\n`;
  list.prices.forEach((item: CoinPrice) => {
    str += ` ⏰ ${getStr(getTime(item.time), 15)} \t 💸 ${item.price.toFixed(2)}$\n--------------------------------------\n`;
  });
  return str;
};

class Commutator {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getRecent() {
    try {
      const response = await axios.get<InfoCoin[]>(`${this.baseUrl}infos/`);
      return `🏆 RECENT TOP-30\n\n${formatList(response.data)}`;
    } catch (error: any) {
      if (error.response.data) return error.response.data.message;
      return error.message;
    }
  }

  async getCrypto(name: string) {
    try {
      const response = await axios.get<CoinPrices>(`${this.baseUrl}infos/${name}`);
      return formatInfos(response.data);
    } catch (error: any) {
      if (error.response.data) return error.response.data.message;
      return error.message;
    }
  }

  async getFavourites(id: any) {
    try {
      const response = await axios.get<InfoCoin[]>(`${this.baseUrl}favs/${id}`);
      if (response.data.length === 0) return 'Your favourite list is empty!';
      return `⭐️ YOUR FAVOURITES\n\n${formatList(response.data)}`;
    } catch (error: any) {
      if (error.response.data) return error.response.data.message;
      return error.message;
    }
  }

  async getButtonText(id: any, name: string) {
    try {
      const response = await axios.get<InfoCoin[]>(`${this.baseUrl}favs/${id}`);
      let bText: string[] = ['Add to favourites', `/create_favourite ${name}`];
      if (response.data) {
        if (response.data.find((item: InfoCoin) => item.name === name)) { bText = ['Remove from favourites', `/delete_favourite ${name}`]; }
      }
      return bText;
    } catch (error: any) {
      return ['Cannot find operation...', '/list_recent'];
    }
  }

  async createFavourite(id: any, name: string) {
    try {
      const response = await axios.post(`${this.baseUrl}favs/`, {
        id,
        name,
      });
      return response.data.message;
    } catch (error: any) {
      if (error.response.data) return 'Invalid cryptocurrency symbol!';
      return error.message;
    }
  }

  async deleteFavourite(id: any, name: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}favs?id=${id}&name=${name}`);
      return response.data.message;
    } catch (error: any) {
      if (error.response.data) return error.response.data.message;
      return error.message;
    }
  }
}

export default Commutator;