import { shallowMount, mount } from "@vue/test-utils";

const factory = (component,options={}) => {
    return (values = {}) => shallowMount(component, {
        data() {
            return {
                ...values
            }
        },
        ...options
    })
}

export default factory;