import mcache from 'memory-cache';

export default function cache(time) {

  return (req, res, next) => {
    const key = `__express__'${req.originalUrl || req.url}`
    const cacheBody = mcache.get(key);

    if (cacheBody) {
      return res.json(cacheBody)
    } else {
      res.sendResponse = res.json
      res.json = (body) => {
        mcache.put(key, body, time * 1000);
        res.sendResponse(body)
      }
      next()

    }
  }
}
