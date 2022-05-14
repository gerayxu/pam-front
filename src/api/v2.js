
// v2 product
import {get, post} from "@/plugins/axios";


export const getProduct = (searchable) => post({url: "/api/v2/products/time", data: searchable})

export const getLinesByLineCode = (line_code) => get({url: "/api/v2/lines/" + line_code})

export const getLinesByBatchCode = (line_batch_code) => get({url: "/api/v2/lines/batch/" + line_batch_code})

export const getLines = (searchable) => post({url: "/api/v2/lines", data: searchable})

export const getProductsByLine = (searchable) => post({url: "/api/v2/products/line", data: searchable})

export const getChains = (searchable) => post({url: "/api/v2/chains", data: searchable})

export const getChainsByChainCode = (chain_code) => get({url: "/api/v2/chains/" + chain_code})

export const getChainsByBatchCode = (chain_batch_code) => get({url: "/api/v2/chains/batch/" + chain_batch_code})

export const getPsms = (searchable) => post({url: "/api/v2/psms",  data: searchable})

export const getProductsSupplyCount = (searchable) => post({url: "/api/v2/products/supply", data: searchable})