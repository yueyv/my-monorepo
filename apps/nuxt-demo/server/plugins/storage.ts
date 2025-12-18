import redisDriver from 'unstorage/drivers/redis';

export default defineNitroPlugin(() => {
  const storage = useStorage();

  // 从运行时配置或其他来源动态传递凭据
  const driver = redisDriver({
    base: 'redis',
    host: useRuntimeConfig().redis.host,
    port: useRuntimeConfig().redis.port,
    /* 其他 redis 连接选项 */
  });

  // 挂载驱动
  storage.mount('redis', driver);
});
