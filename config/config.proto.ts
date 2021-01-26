export interface Config {
  mongodb: {
    uri: string,
    db: string,
    user: string,
    password: string
  },
  minio: {
    endpoint: string,
    port?: number,
    useSSL?: boolean,
    accessKey: string,
    secretKey: string
  }
}
