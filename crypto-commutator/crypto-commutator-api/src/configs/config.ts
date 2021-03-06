import dotenv from 'dotenv';

class MySqlConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  constructor(
    host: string,
    port: number,
    user: string,
    password: string,
    name: string,
  ) {
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.name = name;
  }
}

class CryptoUrls {
  marketCap: string;
  coinBaseCoins: string;
  coinBasePrices: string;
  coinStats: string;
  kucoin: string;
  coinPaprika: string;
  constructor(
    marketCap: string,
    coinBaseCoins: string,
    coinBasePrices: string,
    coinStats: string,
    kucoin: string,
    coinPaprika: string,
  ) {
    this.marketCap = marketCap;
    this.coinBaseCoins = coinBaseCoins;
    this.coinBasePrices = coinBasePrices;
    this.coinStats = coinStats;
    this.kucoin = kucoin;
    this.coinPaprika = coinPaprika;
  }
}

class Configs {
  port: number;
  mysql: MySqlConfig;
  urls: CryptoUrls;
  constructor(port: number, mysql: MySqlConfig, urls: CryptoUrls) {
    this.port = port;
    this.mysql = mysql;
    this.urls = urls;
  }
}

export default function initConfig(): Configs {
  dotenv.config();

  return new Configs(
    Number(process.env.PORT) || 0,
    new MySqlConfig(
      process.env.DB_HOST || '',
      Number(process!.env.DB_PORT) || 0,
      process.env.DB_USER || '',
      process.env.DB_PASSWORD || '',
      process.env.DB_NAME || '',
    ),
    new CryptoUrls(
      process.env.COIN_MARKET || '',
      process.env.COIN_BASE_COINS || '',
      process.env.COIN_BASE_PRICES || '',
      process.env.COIN_STATS || '',
      process.env.KUCOIN || '',
      process.env.COIN_PAPRIKA || '',
    ),
  );
}
