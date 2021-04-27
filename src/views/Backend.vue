<template>
  <Products :products="products" :filters="filters" @set-filters="load" :lastPage="lastPage"/>
</template>

<script>
import Products from "../components/Products";
import {onMounted, reactive, ref} from "vue";

export default {
  name: "Backend",
  components: {Products},
  setup() {
    const products = ref([]);
    const filters = reactive({
      s: '',
      sort: '',
      page: 1
    });
    const lastPage = ref(0);

    const load = async (f) => {
      filters.s = f.s;
      filters.sort = f.sort;
      filters.page = f.page;

      const arr = [];

      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }

      if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
      }

      if (filters.page) {
        arr.push(`page=${filters.page}`);
      }

      const response = await fetch(`http://localhost:8000/api/products/backend?${arr.join('&')}`);

      const content = await response.json();

      products.value = filters.page === 1 ? content.data : [...products.value, ...content.data];
      lastPage.value = content.last_page;
    };

    onMounted(() => load(filters));

    return {
      products,
      filters,
      lastPage,
      load
    }
  }
}
</script>
