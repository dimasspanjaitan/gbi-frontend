'strict'
import qs from 'qs'
// import _ from 'lodash'
// let exception = ['groupBy','groupDesc','itemsPerPage','multiSort','mustSort','page','sortBy','sortByDesc','sortDesc']
export function sanitizeTableQuery(options, limited=false) {
    let pagination = {}
    pagination.offset = (parseInt(options.page) * parseInt(options.itemsPerPage)) - parseInt(options.itemsPerPage) ?? 1
    pagination.limit = parseInt(options.itemsPerPage) ?? 10
    pagination.withCount = true
    if(!limited) pagination.limit = -1

        return JSON.parse(JSON.stringify({pagination}))
}

