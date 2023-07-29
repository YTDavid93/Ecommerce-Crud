<template>
    <div class=  "form-container">
          <form @submit.prevent="submitForm" class="product-form">

            <input type="text" placeholder="name" v-model= "form.name" required />

            <textarea id="description" placeholder="description" v-model=  "form.description" required></textarea>

            <input type="file" ref="imageInput" accept="image/*">
            <input type="text" v-model=  "form.image" placeholder="Image URL">
            <button type="submit">Upload</button>

            <input v-model=  "form.tags" placeholder="tags" type="text">

            <!-- <select v-model="brandId" required>
         <option :key="brand.id" :value="brand.id" v-for="brand of brands">{{ brand.Name }}</option> 
        </select> -->

            <input id="yearOfManufacture" placeholder="yearOfManufacture" v-model= "form.yearOfManufacture">

            <input id="size" placeholder="size" v-model= "form.dimensions.size" type="text" required>

            <input id="model" placeholder="model" v-model= "form.dimensions.model" type="text" required>

            <select v-model="form.codeId" required>
                <option :key="code.id" :value="code.id" v-for="code of codes">{{ code.name }}</option>
            </select>

            <input id="countryOfManufacture" placeholder="countryOfManufacture" v-model= "form.countryOfManufacture"
                type="text" required>

            <input id="batchNo" placeholder="bachNo" v-model= "form.batchNo" type="number" required>

            <input id="warrantyGuarantee" placeholder="warrantyGurantee" v-model= "form.warrantyGuarantee" type="text"
                required>

            <input id="period" placeholder="period" v-model= "form.period" type="text" required>

            <select v-model="form.reviews" required>
                <option :key="review.id" :value="review.id" v-for="review of reviews">{{ review.Title }}</option>
            </select>

            <button type="submit">Submit</button>

          </form>
    </div>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue';
import axios from '../axiosConfig';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';


// const brandId = ref('');
const codeId = ref('');
const ReviewId = ref('');
// const imageUrl = ref('');

// const brands = ref([]);
const reviews = ref([]);

const codes = ref([]);
const images = ref([]);

const route = useRoute();
const router = useRouter();

const  form = ref({
    name: '',
    description: '',
    image: '',
    tags: '',
    yearOfManufacture: '',
    dimensions: {
        size: '',
        model: '',
    },
    // brandId: brandId.value,
    codeId: codeId.value,
    countryOfManufacture: '',
    batchNo: '',
    warrantyGuarantee: '',
    period: '',
    reviews: ReviewId.value
})

// watch(brandId, (newValue) => {
//      form.value.brandId= newValue;    
// })

watch(codeId, (newValue) => {
  form.value.codeId = newValue;
})

watch(ReviewId, (newValue) => {
  form.value.reviews = newValue;
})

// watch(imageUrl, (newValue) => {
//     form.value.image = newValue;
// })


onMounted( async() => {
   try {
        const codesFetched = await axios.get('/code')
        codes.value = codesFetched.data.message;
        console.log(codesFetched.data.message)

        const reviewsFetched = await axios.get('/review')
        reviews.value = reviewsFetched.data.message;
        console.log(reviewsFetched.data.message)

        const imagesFetched = await axios.post('/image')
        images.value = imagesFetched.data.message;
        console.log(imagesFetched.data.message)

        const id = route.params.id
        console.log(id);
        if (id) {
            const response = await axios.get(`/product/${id}`)
            console.log(response.data.message)

            const responseData = response.data.message;
            form.value.name = responseData.name;
            form.value.description = responseData.description;
            form.value.image = responseData.image;
            form.value.tags = responseData.tags.join(', ');
            form.value.yearOfManufacture = responseData.yearOfManufacture;
            form.value.dimensions.size = responseData.dimensions.size;
            form.value.dimensions.model = responseData.dimensions.model;
            form.value.brandId = responseData.brandId;
            form.value.codeId = responseData.codeId[0]._id;
            form.value.countryOfManufacture = responseData.countryOfManufacture;
            form.value.batchNo = responseData.batchNo;
            form.value.warrantyGuarantee = responseData.warrantyGuarantee;
            form.value.period = responseData.period;
            form.value.reviews = responseData.reviews[0].Content;
        }

   } catch(error) {
     console.log(error);
   }
})

// Handel  form submission

const submitForm = async () => {
    try {
        const id = route.params.id;
        if(id) {
            const response = await axios.put(`/product/${id}`, form.value)
            console.log(response.data);
        }
       else {
         const response = await axios.post('/product', form.value);
         console.log(response.data);
       }
        await router.push("/productpage");
    } catch (error) {
        console.log(error); // Handel error
    }
}
</script>

<style scoped>
  .form-container {
    max-width: 600px;
    /* Adjust the width as needed */
    margin: 0 auto;
    /* Center the container horizontally */
}


.product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="file"] {
    padding: 0.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
}

.checkbox-label input[type="checkbox"] {
    margin-right: 0.5rem;
}

.radio-label {
    display: flex;
    align-items: center;
}

.radio-label input[type="radio"] {
    margin-right: 0.5rem;
}

.submit-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}</style>