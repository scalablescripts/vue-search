<template>
  <Products :products="filteredProducts" :filters="filters" @set-filters="filtersChanged" :lastPage="lastPage"/>
</template>

<script>
import Products from "../components/Products";
import {onMounted, reactive, ref} from "vue";

export default {
  name: "Frontend",
  components: {Products},
  setup() {
    const allProducts = ref([]);
    const filteredProducts = ref([]);
    const filters = reactive({
      s: '',
      sort: '',
      page: 1
    });
    const perPage = 9;
    const lastPage = ref(0);

    onMounted(async () => {
      const response = await fetch('http://localhost:8000/api/products/frontend');

      const content = await response.json();

      allProducts.value = content;
      filteredProducts.value = content.slice(0, filters.page * perPage);
      lastPage.value = Math.ceil(content.length / perPage);
    });

    const filtersChanged = (f) => {
      filters.s = f.s;
      filters.sort = f.sort;
      filters.page = f.page;

      let products = allProducts.value.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
          p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0);

      if (filters.sort === 'asc' || filters.sort === 'desc') {
        products.sort((a, b) => {
          const diff = a.price - b.price;

          if (diff === 0) return 0;

          const sign = Math.abs(diff) / diff; // -1, 1

          return filters.sort === 'asc' ? sign : -sign;
        })
      }

      lastPage.value = Math.ceil(products.length / perPage);
      filteredProducts.value = products.slice(0, filters.page * perPage);
    }

    return {
      filteredProducts,
      filters,
      lastPage,
      filtersChanged
    }
  }
}
</script>
