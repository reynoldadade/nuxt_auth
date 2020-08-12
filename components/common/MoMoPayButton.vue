<template>
  <form @submit.prevent="initMoMoPay" class="w-full">
    <button
      class="block px-4 py-3 border-2 font-semibold rounded text-xl hover:shadow-xl w-full bg-black text-white hover:bg-gray-800"
    >
      <i class="fa fa-mobile mr-2"></i>Mobile Money
    </button>
    <script src="https://js.paystack.co/v1/inline.js"></script>
  </form>
</template>

<script>
import { createStackPop } from "~/static/js/paystackHelper.js";
import { mapGetters } from "vuex";

export default {
  methods: {
    initMoMoPay() {
      const { email, phone_number, name } = this.user;
      let options = {
        email,
        phone: phone_number,
        firstname: name,
        lastname: "",
        currency: this.currency,
        metadata: this.metadata,
        label: this.label
      };

      options = this.plan
        ? { ...options, plan: this.plan }
        : { ...options, amount: this.amount };

      const popHandler = createStackPop(options, ({reference}) => this.verifyPayment(reference));
      popHandler.openIframe();
    }
  },

  computed: {
    ...mapGetters({
      user: "checkout/user"
    }),
    metadata() {
      return { ...this.meta, user_id: this.user.id };
    }
  },
  props: ["amount", "label", "currency", "meta", "plan", "verifyPayment"]
};
</script>