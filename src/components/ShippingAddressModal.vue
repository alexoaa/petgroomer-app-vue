<template>
  <div class="fixed z-[100] inset-0 overflow-y-auto pt-4 px-4 pb-16" id="modal">
    <div
      class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div
          class="py-5 text-left px-6 text-[#212121]"
          ref="ShippingAddressModalTarget"
        >
          <div class="p-3 p-sm-4">
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl">Agregar dirección</div>
              <!-- Modal Close Button -->
              <div class="cursor-pointer z-50 w-[50px] pl-[35px] text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </div>
            </div>
            <p class="text-base mb-3">
              Ingresa tu dirección para mostrarte los productos disponibles en
              tu área
            </p>
            <form class="w-full">
              <div class="w-full">
                <select class="w-full">
                  <option value="" class="">Selecciona una ciudad</option>
                  <option data-slug="mxm" data-national="0" value="5">
                    CDMX y Área Metropolitana
                  </option>
                  <option data-slug="Atiz" data-national="0" value="1144">
                    Atizapán de Zaragoza (Edo.Mex)
                  </option>
                  <option data-slug="Chima1" data-national="0" value="1155">
                    Chimalhuacán (Edo.Mex)
                  </option>
                  <option data-slug="Coaberr" data-national="0" value="1150">
                    Coacalco de Berriozabal (Edo.Mex)
                  </option>
                  <option data-slug="Cua" data-national="0" value="1148">
                    Cuautitlán (Edo.Mex)
                  </option>
                  <option data-slug="Cuauizca" data-national="0" value="1146">
                    Cuautitlán Izcalli (Edo.Mex)
                  </option>
                  <option data-slug="Ecat" data-national="0" value="1151">
                    Ecatepec de Morelos (Edo.Mex)
                  </option>
                  <option data-slug="Huix" data-national="0" value="1141">
                    Huixquilucan (Edo.Mex)
                  </option>
                  <option data-slug="Lpz" data-national="0" value="1157">
                    La Paz (Edo.Mex)
                  </option>
                  <option data-slug="Nauca" data-national="0" value="1161">
                    Naucalpan de Juárez (Edo.Mex)
                  </option>
                  <option data-slug="Neza" data-national="0" value="1152">
                    Nezahualcóyotl (Edo.Mex)
                  </option>
                  <option data-slug="Tial" data-national="0" value="1143">
                    Tlalnepantla de Baz (Edo.Mex)
                  </option>
                  <option data-slug="Tulte" data-national="0" value="1149">
                    Tultepec (Edo.Mex)
                  </option>
                  <option data-slug="Tult" data-national="0" value="1147">
                    Tultitlán (Edo.Mex)
                  </option>
                  <option data-slug="Vdchal" data-national="0" value="1158">
                    Valle de Chalco Solidaridad (Edo.Mex)
                  </option>
                  <option data-slug="rep" data-national="1" value="1104">
                    Interior de la República
                  </option>
                </select>
              </div>
              <div
                class="col-12 container_input_forms_v2 form-group field"
                v-show="national"
              >
                <!-- v-cloak="" -->
                <input
                  type="text"
                  name="mexicoAddressCity"
                  id="mexicoAddressCity"
                  class="font_causten_round_light_oblique w-100 test input_labels_hide"
                  placeholder="Ciudad"
                  @keyup="validate_form(2)"
                />
                <label class="font-10" for="mexicoAddressCity">Ciudad</label>
              </div>
              <div class="col-12 container_input_forms_v2 form-group field">
                <input
                  type="text"
                  name="mexicoAddressStreet"
                  id="mexicoAddressStreet"
                  class="font_causten_round_light_oblique w-100 input_labels_hide"
                  placeholder="Calle"
                  @keyup="validate_form(2)"
                />
                <label class="font-10" for="mexicoAddressStreet">Calle</label>
              </div>
              <div class="col-6 pl-0 pr-1">
                <div class="container_input_forms_v2 form-group field">
                  <input
                    type="text"
                    name="mexicoAddressExteriorNumber"
                    id="mexicoAddressExteriorNumber"
                    class="font_causten_round_light_oblique w-100 input_labels_hide"
                    placeholder="Número exterior"
                    @keyup="validate_form(2)"
                  />
                  <label class="font-10" for="mexicoAddressExteriorNumber"
                    >Número exterior</label
                  >
                </div>
              </div>
              <div class="col-6 pl-1 pr-0">
                <div class="container_input_forms_v2 form-group field">
                  <input
                    type="text"
                    name="int_shipment"
                    id="int_shipment"
                    class="font_causten_round_light_oblique w-100 input_labels_hide"
                    placeholder="Número interior"
                  />
                  <label class="font-10" for="int_shipment"
                    >Número interior</label
                  >
                </div>
              </div>
              <div class="col-12 container_input_forms_v2 form-group field">
                <input
                  type="number"
                  name="postal_code_shipping"
                  @keyup="getColonias(0, 2)"
                  id="postal_code_shipping"
                  class="font_causten_round_light_oblique w-100 test input_labels_hide"
                  placeholder="Código postal"
                />
                <label class="font-10" for="postal_code_shipping"
                  >Código postal</label
                >
              </div>
              <div
                class="col-12 form-group d-none"
                id="complement_postal_code"
                style="display: contents"
              >
                <div
                  class="col-12 container_input_forms_v2 form-group field p-0"
                >
                  <label
                    class="font-10 control-label"
                    for="mexicoAddressColony"
                    style="opacity: 0"
                    >Selecciona una colonia</label
                  >
                  <select
                    name="mexicoAddressColony"
                    id="mexicoAddressColony"
                    class="w-100 select_labels_hide font_causten_round_semi_bold_oblique"
                    @change="validate_form(2)"
                  >
                    <option value="">Selecciona una colonia</option>
                    <!-- <option v-for="colonia in colonias" :value="colonia">
                {{ colonia }}
              </option> -->
                  </select>
                </div>
                <div class="col-6 pr-1 pl-0">
                  <div class="container_input_forms_v2 form-group field">
                    <input
                      type="text"
                      name="mexicoAddressState"
                      id="mexicoAddressState"
                      class="font_causten_round_light_oblique w-100 input_labels_hide"
                      placeholder="Estado"
                      @keyup="validate_form(2)"
                    />
                    <label class="font-10" for="mexicoAddressState"
                      >Estado</label
                    >
                  </div>
                </div>
                <div class="col-6 pr-0 pl-1">
                  <div class="container_input_forms_v2 form-group field">
                    <input
                      type="text"
                      name="delegation"
                      id="delegation"
                      class="font_causten_round_light_oblique w-100 input_labels_hide"
                      placeholder="Municipio"
                      @keyup="validate_form(2)"
                    />
                    <label class="font-10" for="delegation">Municipio</label>
                  </div>
                </div>
                <div class="col-12 px-0">
                  <label for="font-10" class="mb-0">Entre calles</label>
                </div>
                <div class="col-6 pr-1 pl-0">
                  <div class="container_input_forms_v2 form-group field">
                    <input
                      type="text"
                      name="reference_street_one"
                      id="reference_street_one"
                      class="font_causten_round_light_oblique w-100 input_labels_hide"
                      placeholder="Calle 1"
                    />
                    <label class="font-10" for="reference_street_one"
                      >Calle 1</label
                    >
                  </div>
                </div>
                <div class="col-6 pr-0 pl-1">
                  <div class="container_input_forms_v2 form-group field">
                    <input
                      type="text"
                      name="reference_street_two"
                      id="reference_street_two"
                      class="font_causten_round_light_oblique w-100 input_labels_hide"
                      placeholder="Calle 2"
                    />
                    <label class="font-10" for="reference_street_two"
                      >Calle 2</label
                    >
                  </div>
                </div>
              </div>
              <div class="modal-footer border-0 p-0 w-100">
                <button
                  id="button_submit"
                  class="btn_actions_laika w-100 btn color_white"
                  type="submit"
                  :class="button_submit_form ? 'btn_active' : 'bg_disabled'"
                  :disabled="!button_submit_form"
                >
                  Agregar dirección
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

import useGeneralVariablesStore from "@/stores/generalVariables";

export default {
  name: "ShippingAddressModal",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapStores(useGeneralVariablesStore),
  },
  mounted() {
    const ShippingAddressModalTarget = ref(
      this.$refs.ShippingAddressModalTarget
    );
    onClickOutside(ShippingAddressModalTarget, () => {
      this.generalVariablesStore.ShippingAddressModalIsOpen = false;
    });
  },
};
</script>
