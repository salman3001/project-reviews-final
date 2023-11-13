<script setup lang="ts">
import createUserStore from 'src/stores/createUserStore';
import { srollToView } from 'src/utils/scrollToView'
import { onMounted } from 'vue';
import useAddressStore from 'src/stores/addressStore';

const address = useAddressStore();


const createUser = createUserStore()
defineProps<{
  step: number
}>()

onMounted(() => {
  address.getCountries()
  createUser.getJobIndustry()
  createUser.getJobDepartments()
  createUser.getLangauges()

})
</script>

<template>
  <q-form class="column q-gutter-y-md" @submit="() => {
    $emit('next')
  }" @validation-error="srollToView">
    <div class="column q-gutter-y-md">
      <p class="text-subtitle1">Work Experience</p>
      <div class="row q-col-gutter-md q-pb-lg" v-for="(w, i) in createUser.form.workExperience" :key="i">
        <div class="col-12 row q-col-gutter-sm items-center">
          <p class="text-grey">Work Experience {{ i + 1 }}</p>
          <div>
            <q-btn v-if="i > 0" flat icon="delete" @click="() => createUser.popWorkExperience()">Remove
            </q-btn>
          </div>
        </div>

        <q-select outlined emit-value map-options v-model="w.jobIndustryId" :options="createUser.jobIndustry"
          label="Job Industry" class="col-12 col-sm-6 col-md-3" :rules="[$rules.required('required')]" />
        <q-input outlined v-model="w.jobFunction" label="Job Functions" class="col-12 col-sm-6 col-md-3" />
        <q-input outlined v-model="w.jobTitle" label="Job Title" class="col-12 col-sm-6 col-md-3"
          :rules="[$rules.required('required')]" />
        <q-select outlined emit-value map-options v-model="w.jobDepartmentId" :options="createUser.jobDepartments"
          label="Job Department" class="col-12 col-sm-6 col-md-3" :rules="[$rules.required('required')]" />
        <q-input outlined v-model="w.companyName" label="Company Name" class="col-12 col-sm-6 col-md-3" />
        <q-input outlined v-model="w.companySize" label="Company Size" class="col-12 col-sm-6 col-md-3" />
        <q-select outlined emit-value map-options v-model="w.countryId" :options="address.selectContries"
          @update:model-value="(value) => {
            w.stateId = ''
            w.cityId = ''
            address.getstates(value)
          }" label="Country" class="col-12 col-sm-6 col-md-3" />
        <q-select outlined emit-value map-options v-model="w.stateId" :options="address.selectStates" @update:model-value="(value) => {
          w.cityId = ''
          address.getCities(value)
        }" label="State" class="col-12 col-sm-6 col-md-3" />
        <q-select outlined emit-value map-options v-model="w.cityId" :options="address.selectCities" label="City"
          class="col-12 col-sm-6 col-md-3" />
        <q-input outlined v-model="w.zip" label="Post Code" class="col-12 col-sm-6 col-md-3" />
        <q-toggle class="col-12" v-model="w.isCurrent" label="I am currently woring here" />
        <div class="col-12 col-sm-6 col-md-3">
          <q-input outlined v-model="w.startDate" label="Start Date" mask="##/##/####" hint="dd/mm/yyyy">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="w.startDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <q-input outlined v-model="w.endDate" label="End Date" mask="##/##/####" hint="dd/mm/yyyy">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="w.endDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-input type="textarea" outlined v-model="w.desc" label="Description" class="col-12" />
      </div>
      <div class="row justify-end">
        <q-btn color="primary" style="max-width: 14rem" @click="createUser.addNewWorkExperience">+ Add
          New Experience</q-btn>
      </div>
    </div>
    <div class="column q-gutter-y-md">
      <p class="text-subtitle1">Education</p>
      <div class="row q-col-gutter-md q-pb-lg" v-for="(w, i) in createUser.form.education" :key="i">
        <div class="col-12 row q-col-gutter-sm items-center">
          <p class="text-grey">Education {{ i + 1 }}</p>
          <div>
            <q-btn v-if="i > 0" flat icon="delete" @click="() => createUser.popEducation()">Remove
            </q-btn>
          </div>
        </div>

        <q-input outlined v-model="w.institute" label="Institute" class="col-12 col-sm-6 col-md-3"
          :rules="[$rules.required('required')]" />
        <q-input outlined v-model="w.degree" label="Degree" class="col-12 col-sm-6 col-md-3"
          :rules="[$rules.required('required')]" />
        <q-input outlined v-model="w.field" label="Job Title" class="col-12 col-sm-6 col-md-3" />
        <div class="col-12 col-sm-6 col-md-3">
          <q-input outlined v-model="w.startDate" label="Start Date" mask="##/##/####" hint="dd/mm/yyyy">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="w.startDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <q-input outlined v-model="w.endDate" mask="##/##/####" label="End Date" hint="dd/mm/yyyy">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="w.endDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-input type="textarea" outlined v-model="w.desc" label="Description" class="col-12" />
      </div>
      <div class="row justify-end">
        <q-btn color="primary" style="max-width: 14rem" @click="createUser.addNewEducation">+ Add
          New Education</q-btn>
      </div>
    </div>
    <div class="column q-gutter-y-md">
      <p class="text-subtitle1">Language</p>
      <div class="row q-col-gutter-md q-pb-lg" v-for="(w, i) in createUser.form.lanuages" :key="i">
        <div class="col-12 row q-col-gutter-sm items-center">
          <p class="text-grey">Language {{ i + 1 }}</p>
          <div>
            <q-btn v-if="i > 0" flat icon="delete" @click="() => createUser.popLanguage()">Remove
            </q-btn>
          </div>
        </div>
        <q-select outlined emit-value map-options v-model="w.language_id" :options="createUser.languages" label="Language"
          class="col-12 col-sm-6 col-md-3">
          <template v-slot:append>
            <q-icon v-if="i > 0" name="close" color="primary" @click="() => createUser.popLanguage()"
              :rules="[$rules.required('required')]" />
          </template>
        </q-select>
      </div>
      <div class="row justify-end">
        <q-btn color="primary" style="max-width: 14rem" size="small" @click="createUser.addNewLangauge">+ Add
          language</q-btn>
      </div>
    </div>
    <div class="column q-gutter-y-md">
      <p class="text-subtitle1">Skills</p>
      <div class="row q-col-gutter-md q-pb-lg" v-for="(w, i) in createUser.form.skills" :key="i">
        <div class="col-12 row q-col-gutter-sm items-center">
          <p class="text-grey">Skill {{ i + 1 }}</p>
          <div>
            <q-btn v-if="i > 0" flat icon="delete" @click="() => createUser.popSkill()">Remove
            </q-btn>
          </div>
        </div>

        <q-input outlined v-model="w.name" label="Skill Name" class="col-12 col-sm-6 col-md-3"
          :rules="[$rules.required('required')]" />
        <q-input type="textarea" outlined v-model="w.desc" label="Description" class="col-12" />

      </div>
      <div class="row justify-end">
        <q-btn color="primary" style="max-width: 14rem" size="small" @click="createUser.addNewSkill">+ Add
          New Skill</q-btn>
      </div>
      <div class="row justify-end q-gutter-md">
        <q-btn v-if="step > 1" style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem" type="submit"
          label="Back" class="q-ml-sm" @click="() => {
            $emit('prev')
          }" />
        <q-btn color="primary" type="submit" style="min-width: 8rem">Next</q-btn>
      </div>
    </div>
  </q-form>
</template>
