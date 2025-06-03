import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/plugins/axios";
import { watch } from "vue";
import moment from "moment";

export const useSaleStore = defineStore('sale', () => {
    // state
    const products = ref([])
    const sale = reactive({
        date: moment().format('YYYY-MM-DD'),
        total: 0,
        client: {
            id: null,
            doc: '',
            fname: '',
            lname: '',
        },
        products: [{
            id: null,
            name: '',
            quantity: 1,
            price: 0,
        }]
    })

    // getters
    const total = computed(() =>
        sale.products.reduce((sum, item) => {
            if (item.id && item.quantity && item.price) {
                return sum + (item.quantity * item.price);
            }
            return sum;
        }, 0)
    );

    // watch
    watch(total, (value) => {
        sale.total = value
    })

    // actions
    const searchClient = async (doc) => {
        sale.client = {
            id: null,
            doc,
            fname: '',
            lname: '',
        }

        const response = await api.get(`/clients?doc=${encodeURIComponent(doc)}`)

        if (response.data.length > 0) {
            sale.client = response.data[0]
        }
    }

    const searchProducts = async () => {
        const response = await api.get('/products');
        products.value = response.data
    }

    const addProduct = () => {
        const allValid = sale.products.every(item => {
            const original = products.value.find(p => p.id === item.id);

            if (original) {
                item.price = original.price;
                item.name = original.name;
            }

            return (
                item.id &&
                item.quantity &&
                item.quantity > 0
            );
        });

        if (sale.products.length === 0 || allValid) {
            sale.products.unshift({
                id: null,
                name: '',
                quantity: 1,
                price: 0,
            });
        }
    }

    const removeProduct = (index) => {
        sale.products.splice(index, 1);
    }

    return {
        products,
        sale,
        searchClient,
        searchProducts,
        addProduct,
        removeProduct,
    }
}, {
    persist: true,
})