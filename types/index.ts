export interface Product {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	type: string;
	status: string;
	featured: boolean;
	catalog_visibility: string;
	description: string;
	short_description: string;
	sku: string;
	price: string;
	regular_price: string;
	sale_price: string;
	date_on_sale_from: null;
	date_on_sale_from_gmt: null;
	date_on_sale_to: null;
	date_on_sale_to_gmt: null;
	on_sale: boolean;
	purchasable: boolean;
	total_sales: number;
	virtual: boolean;
	downloadable: boolean;
	downloads: unknown[];
	download_limit: number;
	download_expiry: number;
	external_url: string;
	button_text: string;
	tax_status: string;
	tax_class: string;
	manage_stock: boolean;
	stock_quantity: null;
	backorders: string;
	backorders_allowed: boolean;
	backordered: boolean;
	low_stock_amount: null;
	sold_individually: boolean;
	weight: string;
	dimensions: Dimensions;
	shipping_required: boolean;
	shipping_taxable: boolean;
	shipping_class: string;
	shipping_class_id: number;
	reviews_allowed: boolean;
	average_rating: string;
	rating_count: number;
	upsell_ids: unknown[];
	cross_sell_ids: unknown[];
	parent_id: number;
	purchase_note: string;
	categories: Category[];
	tags: unknown[];
	images: Image[];
	attributes: unknown[];
	default_attributes: unknown[];
	variations: unknown[];
	grouped_products: unknown[];
	menu_order: number;
	price_html: string;
	related_ids: number[];
	meta_data: unknown[];
	stock_status: string;
	_links: Links;
}

export interface Image {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
}

export interface Links {
	self: Collection[];
	collection: Collection[];
}

export interface Collection {
	href: string;
}

export interface Category {
	id: number;
	name: string;
	slug: string;
}

export interface Dimensions {
	length: string;
	width: string;
	height: string;
}

export interface Order {
	id: number;
	parent_id: number;
	status: string;
	currency: string;
	version: string;
	prices_include_tax: boolean;
	date_created: string;
	date_modified: string;
	discount_total: string;
	discount_tax: string;
	shipping_total: string;
	shipping_tax: string;
	cart_tax: string;
	total: string;
	total_tax: string;
	customer_id: number;
	order_key: string;
	billing: Address;
	shipping: Address;
	payment_method: string;
	payment_method_title: string;
	transaction_id: string;
	customer_ip_address: string;
	customer_user_agent: string;
	created_via: string;
	customer_note: string;
	date_completed: null;
	date_paid: string;
	cart_hash: string;
	number: string;
	meta_data: MetaDatum[];
	line_items: LineItem[];
	tax_lines: unknown[];
	shipping_lines: ShippingLine[];
	fee_lines: unknown[];
	coupon_lines: unknown[];
	refunds: unknown[];
	date_created_gmt: string;
	date_modified_gmt: string;
	date_completed_gmt: null;
	date_paid_gmt: string;
	currency_symbol: string;
	_links: Links;
}

export interface Links {
	self: Collection[];
	collection: Collection[];
	customer: Collection[];
}

export interface Collection {
	href: string;
}

export interface LineItem {
	id: number;
	name: string;
	product_id: number;
	variation_id: number;
	quantity: number;
	tax_class: string;
	subtotal: string;
	subtotal_tax: string;
	total: string;
	total_tax: string;
	taxes: unknown[];
	meta_data: unknown[];
	sku: string;
	price: number;
	parent_name: null;
}

export interface MetaDatum {
	id: number;
	key: string;
	value: string;
}

export interface ShippingLine {
	id: number;
	method_title: string;
	method_id: string;
	instance_id: string;
	total: string;
	total_tax: string;
	taxes: unknown[];
	meta_data: unknown[];
}

export interface Address {
	first_name: string;
	last_name: string;
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
	email?: string;
	phone?: string;
}

export interface ShippingLine {
	method_id: string;
	method_title: string;
	total: string;
}

export interface Cart {
	coupons: Coupon[];
	shipping_rates: unknown[];
	shipping_address: IngAddress;
	billing_address: IngAddress;
	items: Item[];
	items_count: number;
	items_weight: number;
	needs_payment: boolean;
	needs_shipping: boolean;
	has_calculated_shipping: boolean;
	fees: unknown[];
	totals: CartTotals;
	errors: unknown[];
	payment_requirements: string[];
	generated_timestamp: number;
	extensions: unknown;
}

export interface IngAddress {
	first_name: string;
	last_name: string;
	compunknown: string;
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
	email?: string;
	phone?: string;
}

export interface Coupon {
	code: string;
	discount_type: string;
	totals: CouponTotals;
}

export interface CouponTotals {
	total_discount: string;
	total_discount_tax: string;
	currency_code: string;
	currency_symbol: string;
	currency_minor_unit: number;
	currency_decimal_separator: string;
	currency_thousand_separator: string;
	currency_prefix: string;
	currency_suffix: string;
}

export interface Item {
	key: string;
	id: number;
	quantity: number;
	quantity_limit: number;
	name: string;
	short_description: string;
	description: string;
	sku: string;
	low_stock_remaining: null;
	backorders_allowed: boolean;
	show_backorder_badge: boolean;
	sold_individually: boolean;
	permalink: string;
	images: Image[];
	variation: unknown[];
	item_data: unknown[];
	prices: Prices;
	totals: ItemTotals;
	catalog_visibility: string;
	extensions: unknown;
}

export interface Image {
	id: number;
	src: string;
	thumbnail: string;
	srcset: string;
	sizes: string;
	name: string;
	alt: string;
}

export interface Prices {
	price: string;
	regular_price: string;
	sale_price: string;
	price_range: null;
	currency_code: string;
	currency_symbol: string;
	currency_minor_unit: number;
	currency_decimal_separator: string;
	currency_thousand_separator: string;
	currency_prefix: string;
	currency_suffix: string;
	raw_prices: RawPrices;
}

export interface RawPrices {
	precision: number;
	price: string;
	regular_price: string;
	sale_price: string;
}

export interface ItemTotals {
	line_subtotal: string;
	line_subtotal_tax: string;
	line_total: string;
	line_total_tax: string;
	currency_code: string;
	currency_symbol: string;
	currency_minor_unit: number;
	currency_decimal_separator: string;
	currency_thousand_separator: string;
	currency_prefix: string;
	currency_suffix: string;
}

export interface CartTotals {
	total_items: string;
	total_items_tax: string;
	total_fees: string;
	total_fees_tax: string;
	total_discount: string;
	total_discount_tax: string;
	total_shipping: string;
	total_shipping_tax: string;
	total_price: string;
	total_tax: string;
	tax_lines: unknown[];
	currency_code: string;
	currency_symbol: string;
	currency_minor_unit: number;
	currency_decimal_separator: string;
	currency_thousand_separator: string;
	currency_prefix: string;
	currency_suffix: string;
}

export interface Category {
	id: number;
	name: string;
	slug: string;
	parent: number;
	description: string;
	display: string;
	image: null;
	menu_order: number;
	count: number;
	_links: Links;
}

export interface Links {
	self: Collection[];
	collection: Collection[];
}

export interface Collection {
	href: string;
}

export interface User {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	email: string;
	first_name: string;
	last_name: string;
	role: string;
	username: string;
	billing: Address;
	shipping: Address;
	is_paying_customer: boolean;
	avatar_url: string;
	meta_data: unknown[];
	_links: Links;
}

export interface Links {
	self: Collection[];
	collection: Collection[];
}

export interface Collection {
	href: string;
}

export interface CartItem {
	descQty: null;
	id: number;
	image: string;
	name: string;
	price: number;
	qty: number;
	totalPrice: number;
}
