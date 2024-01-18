# lorcana.top

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
Partial Text Searches
    n:xxxx to search by name
    b:xxxx to search by the body text
    a:xxxx to search by the artist
    f:xxxx to search by the flavor text

Integer Searches (:, =, <, >, <=, >=)
    c.#  to search by the cost
    w.#  to search by the willpower (hp)
    s.# to search by the strength
    l.# to search by the strength

Search by the key letter (or exact text match)
    i:x (i:xxxx) to search by the ink color 
    r:x (r:xxxx) to search by the rarity
    t:x (t:xxxx) to search by the type

One Offs
    e:XXX to search by the set (exact matches only)
    z:yes || z:no to search by inkable
```