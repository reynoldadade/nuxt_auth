<template>
  <div class="w-screen h-screen relative overflow-x-hidden">
    <Loader
      v-if="loading && !preError"
      class="w-full h-full absolute top-0 left-0 right-0 bottom-0"
    />
    <div v-if="preError" class="flex w-full h-full items-center justify-center">
      <div class="rounded border bg-gray-100 p-8 text-center">
        <h3 class="text-2xl">Something went wrong...</h3>
        <p
          class="text-gray-700 text-sm mb-1"
        >Sorry we cannot process your request at this time, try again later.</p>
        <code class="text-xs bg-red-200 p-1 rounded">{{preError}}</code>
      </div>
    </div>
    <section class="w-full h-full flex flex-wrap relative lg:overflow-hidden" v-if="appReady">
      <div
        class="w-full lg:border-r lg:bg-gray-100 xl:w-2/3 lg:w-7/12 lg:h-full flex flex-col p-10 lg:p-16"
      >
        <div class="rounded border bg-white w-full p-8">
          <h2 class="text-2xl mb-1 uppercase">Checkout</h2>
          <div class="bg-gray-400 w-32" style="height:3px"></div>
          <div class="mt-10">
            <h3 class="text-xl">{{vPackage.name}}</h3>
            <span class="text-xs italic text-gray-600">Features</span>
            <ul class="block mt-2">
              <li
                v-for="(feature, key) in vFeatures"
                :key="key"
                class="captialize"
                style="padding-bottom:8px"
              >
                <div class="text-gray-600 capitalize">
                  <span class="font-bold ">{{ feature }}</span>
                  {{ key.replace("_", " ") }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        {{vPricing}}
      </div>
      <div
        class="w-full relative lg:w-5/12 xl:w-1/3 lg:h-full lg:overflow-y-auto flex flex-col justify-center items-center p-10 xl:p-16"
      >
        <StripeForm />
        <div class="w-full lg:pb-20" v-if="false">
          <div class="flex items-center justify-center my-10">
            <div style="height:2px" class="w-32 bg-gray-300"></div>
            <h4 class="mx-3 text-sm font-bold text-gray-500">OR</h4>
            <div style="height:2px" class="w-32 bg-gray-300"></div>
          </div>
          <!-- <MoMoPayButton
            :plan="plan"
            :amount="amount"
            :label="label"
            :currency="currency"
            :meta="meta"
            :verifyPayment="verifyPayment"
          />-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    Loader: () => import("~/components/common/Loader.vue"),
    StripeForm: () => import("~/components/common/StripeForm.vue"),
  },

  middleware: ["getAuthUser"],

  asyncData({ app }) {
    const _package_ = app.$cookies.get("_package_");
    return { pack: _package_ };
  },

  data() {
    return {
      pack: null,
      package_detail: null,
      preError: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    appReady() {
      return this.package_detail != null && this.user != null;
    },
    vPackage() {
      if (this.package_detail) {
        const { id, name, product, valid_period } = this.package_detail;
        return { id, name, product, valid_period };
      }
      return null;
    },

    vFeatures() {
      return this.package_detail ? this.package_detail.features : null;
    },

    vPricing() {
      return this.package_detail ? this.package_detail.pricing : null;
    },

    currentCountryPricing() {
      let country = "gh";
      if (this.user && this.user.country) {
        country = this.user.country.toLowerCase();
      }
      return this.vPricing //
        ? this.vPricing[country]
        : null;
    },

    selectedPlanPricing() {
      return this.currentCountryPricing
        ? this.currentCountryPricing[this.pack.payment_type]
        : null;
    },
  },

  mounted() {
    this.user ? this.loadPackage() : this.onPreError();
  },

  methods: {
    loadPackage() {
      this.$axios
        .$get(`/checkout/packages/${this.pack.package_id}`)
        .then(
          (response) => {
            if (response && response.data) {
              this.package_detail = response.data;
            }
          },
          (error) => {
            console.log(error);
            this.onPreError();
          }
        )
        .finally((_) => (this.loading = false));
    },
    onPreError() {
      this.preError = !this.user
        ? "Authentication failed"
        : "Invalid transaction information";
    },
  },
};
</script>

<style>
</style>
