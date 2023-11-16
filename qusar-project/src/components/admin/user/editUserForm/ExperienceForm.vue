<script setup lang="ts">
import editUserStore from 'src/stores/editUserStore';
import { CityApi, CountriesApi, StateApi } from 'src/utils/BaseApiService';
import { onMounted, ref, } from 'vue';

const editUser = editUserStore()

const prop = defineProps<{ index: number }>()

const countiresOptions = ref<any[]>([])
const stateOptions = ref<any[]>([])
const cityOptions = ref<any[]>([])



const getCountries = async () => {
  CountriesApi.index().then(({ data }) => {
    countiresOptions.value = (data.value as any).map((d: any) => ({
      label: d.name,
      value: d.id
    }))
  })
}

const getStates = async (id: string) => {
  StateApi.index({
    filter: {
      countryId: id
    }
  }).then(({ data }) => {
    stateOptions.value = (data.value as any).map((d: any) => ({
      label: d.name,
      value: d.id
    }))
  })
}

const getCities = async (id: string) => {
  CityApi.index({
    filter: {
      stateId: id
    }
  }).then(({ data }) => {
    cityOptions.value = (data.value as any).map((d: any) => ({
      label: d.name,
      value: d.id
    }))
  })
}

onMounted(async () => {
  await editUser.getJobDepartments()
  await editUser.getJobIndustry()
  if (editUser.workExperienceForm.workExperience[prop.index].countryId) {
    await getCountries()
  }
  if (editUser.workExperienceForm.workExperience[prop.index].stateId) {
    const temp = editUser.workExperienceForm.workExperience[prop.index].stateId
    editUser.workExperienceForm.workExperience[prop.index].stateId = ''
    await getStates(editUser.workExperienceForm.workExperience[prop.index].countryId)
    editUser.workExperienceForm.workExperience[prop.index].stateId = temp
  }
  if (editUser.workExperienceForm.workExperience[prop.index].cityId) {
    const temp = editUser.workExperienceForm.workExperience[prop.index].cityId
    editUser.workExperienceForm.workExperience[prop.index].cityId = ''
    await getCities(editUser.workExperienceForm.workExperience[prop.index].cityId)
    editUser.workExperienceForm.workExperience[prop.index].cityId = temp

  }
})


</script>

<template>
  <q-select outlined emit-value map-options v-model="editUser.workExperienceForm.workExperience[index].jobIndustryId"
    :options="editUser.jobIndustry" label="Job Industry" class="col-12 col-sm-6 col-md-3"
    :rules="[$rules.required('required')]" />
  <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].jobFunction" label="Job Functions"
    class="col-12 col-sm-6 col-md-3" />
  <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].jobTitle" label="Job Title"
    class="col-12 col-sm-6 col-md-3" :rules="[$rules.required('required')]" />
  <q-select outlined emit-value map-options v-model="editUser.workExperienceForm.workExperience[index].jobDepartmentId"
    :options="editUser.jobDepartments" label="Job Department" class="col-12 col-sm-6 col-md-3"
    :rules="[$rules.required('required')]" />
  <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].companyName" label="Company Name"
    class="col-12 col-sm-6 col-md-3" />
  <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].companySize" label="Company Size"
    class="col-12 col-sm-6 col-md-3" />
  <q-select outlined emit-value map-options v-model="editUser.workExperienceForm.workExperience[index].countryId"
    :options="countiresOptions" @update:model-value="v => {
      editUser.workExperienceForm.workExperience[index].stateId = ''
      editUser.workExperienceForm.workExperience[index].cityId = ''
      getStates(v)
    }" label="Country" class="col-12 col-sm-6 col-md-3" />
  <q-select outlined emit-value map-options v-model="editUser.workExperienceForm.workExperience[index].stateId"
    :options="stateOptions" @update:model-value="v => {
      editUser.workExperienceForm.workExperience[index].cityId = ''
      getCities(v)
    }" label="State" class="col-12 col-sm-6 col-md-3" />
  <q-select outlined emit-value map-options v-model="editUser.workExperienceForm.workExperience[index].cityId"
    :options="cityOptions" label="City" class="col-12 col-sm-6 col-md-3" />
  <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].zip" label="Post Code"
    class="col-12 col-sm-6 col-md-3" />
  <q-toggle class="col-12" v-model="editUser.workExperienceForm.workExperience[index].isCurrent"
    label="I am currently woring here" />
  <div class="col-12 col-sm-6 col-md-3">
    <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].startDate" label="Start Date"
      mask="##/##/####" hint="dd/mm/yyyy">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date :model-value="editUser.workExperienceForm.workExperience[index].startDate" mask="DD/MM/YYYY">
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
    <q-input outlined v-model="editUser.workExperienceForm.workExperience[index].endDate" label="End Date"
      mask="##/##/####" hint="dd/mm/yyyy">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date :model-value="editUser.workExperienceForm.workExperience[index].endDate" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
  <q-input type="textarea" outlined v-model="editUser.workExperienceForm.workExperience[index].desc" label="Description"
    class="col-12" />
</template>
