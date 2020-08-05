import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Checkout from "@/pages/checkout.vue";
import * as storex from "@/store/checkout.js";
import FactoryCreator from "../../__factory__";
import { FakeTags, FakeFormData } from "../../__faker__";
import { createCookies, createRouter, createSwal } from "../../__mocks__";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Registration page interactions", () => {
  let store, wrapper, stubs;
  beforeEach(() => {
    store = new Vuex.Store(storex);
    stubs = {
      "nuxt-link": true,
      Map: true,
      Loading: true,
      Toast: true,
      FileChooser: true,
      VSelect: true,
      SearchBar: true,
    };
  });

  afterEach(() => {
    store = null;
    stubs = null;
    if (wrapper) {
      wrapper.destroy();
      wrapper = null;
    }
  });

  it("should check data values and validate computed values", () => {
    const factory = FactoryCreator(Register, { store, localVue, stubs });

    wrapper = factory({
      formData: FakeFormData(),
      tags: FakeTags(),
    });

    //Avoid duplicate Tag selection
    expect(wrapper.vm.primary_tags).toEqual(
      expect.not.arrayContaining(["b", "c"])
    );
    expect(wrapper.vm.secondary_tags).toEqual(
      expect.not.arrayContaining(["a", "c"])
    );
    expect(wrapper.vm.tertiary_tags).toEqual(
      expect.not.arrayContaining(["a", "b"])
    );

    //Check non empty boundary when drawn
    wrapper.setData({
      hasDrawn: true,
    });

    expect(wrapper.vm.boundary).not.toEqual([]);
    expect(wrapper.vm.boundary.length).toBe(5);
  });

  it("should validate form and register showing document upload", async () => {
    const factory = FactoryCreator(Register, {
      store,
      localVue,
      stubs,
      mocks: {
        $swal: createSwal(),
        $cookies: createCookies(),
        $router: createRouter(),
        $axios: {
          $post: jest.fn().mockReturnValue(
            new Promise((res, _) => {
              res({
                data: {
                  access_token: "some_token",
                  artisan_id: 1,
                },
              });
            })
          ),
        },
      },
    });

    wrapper = factory({
      tags: FakeTags(),
    });

    //Draw boundary required
    wrapper.vm.onFormSubmit();
    expect(wrapper.vm.$swal).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$swal).lastCalledWith({
      icon: "error",
      title: "Oops",
      text: "Draw a shape around the region you would like to work in",
    });

    wrapper.setData({
      formData: { ...FakeFormData(), password: "1234560" },
      hasDrawn: true,
    });

    //Password should match
    wrapper.vm.onFormSubmit();
    expect(wrapper.vm.$store.getters["hasNotification"]).toBe(true);
    expect(wrapper.vm.$store.getters["notifications"]).toEqual([
      {
        message: "Passwords should match",
        type: "error",
      },
    ]);

    //successfully validated
    wrapper.setData({
      formData: FakeFormData(),
    });

    wrapper.vm.onFormSubmit();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$axios.$post).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$swal).toHaveBeenCalledTimes(2);

    //registration completed
    expect(wrapper.vm.$swal).lastCalledWith({
      position: "top-end",
      icon: "success",
      title: "Registration Completed",
      showConfirmButton: false,
      timer: 1500,
    });


    expect(wrapper.vm.$cookies.remove).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$cookies.remove).lastCalledWith("profile");
    expect(wrapper.vm.$cookies.set).toHaveBeenCalledTimes(2);

    expect(wrapper.vm.$router.replace).lastCalledWith("/verify");
  });
});
