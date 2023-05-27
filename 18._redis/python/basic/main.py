import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

# redis_client.set('name', 'John')

# print(redis_client.get('name'))

# redis_client.setex('name', 10, 'John')

print(redis_client.get('name'))
