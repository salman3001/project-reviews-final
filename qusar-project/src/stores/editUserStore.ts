import { defineStore } from 'pinia';
import {
  JobDepartmentApi,
  JobIndustryApi,
  LanguageApi,
  userApi,
} from 'src/utils/BaseApiService';
import { ref } from 'vue';

const editUserStore = defineStore('editUser', () => {
  const user = ref<null | Record<string, any>>(null);
  const userForm = ref({
    image: null,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      password_confirmaton: '',
      phone: '',
      desc: '',
      isActive: false,
      isPublic: false,
    },
  });

  const addressForm = ref({
    address: {
      address: '',
      continentId: '',
      countryId: '',
      stateId: '',
      cityId: '',
      streetId: '',
      zip: '',
    },
  });

  const socialForm = ref({
    social: {
      website: '',
      facebook: '',
      twitter: '',
      instagram: '',
      pintrest: '',
      linkedin: '',
      vk: '',
      whatsapp: '',
      telegram: '',
    },
  });

  const favoriteLinksForm = ref({
    favoriteLinks: [{ link: '' }],
  });

  const workExperienceForm = ref({
    workExperience: [
      {
        jobIndustryId: '',
        jobFunction: '',
        jobTitle: '',
        jobDepartmentId: '',
        companyName: '',
        companySize: '',
        cityId: '',
        stateId: '',
        countryId: '',
        zip: '',
        startDate: '',
        endDate: '',
        desc: '',
        isCurrent: false,
      },
    ],
  });

  const educationForm = ref({
    education: [
      {
        institute: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        desc: '',
      },
    ],
  });

  const languagesForm = ref({
    lanuages: [
      {
        language_id: '',
      },
    ],
  });

  const skillsForm = ref({
    skills: [
      {
        name: '',
        desc: '',
      },
    ],
  });

  const notificationForm = ref({
    NotificationSettings: {
      onMessageRecieve: true,
      onCommentReply: true,
      onProductUpdate: true,
      onOffers: true,
    },
  });

  const jobDepartments = ref([]);
  const jobIndustry = ref([]);
  const languages = ref([]);

  const addNewFavoriteLinks = () => {
    favoriteLinksForm.value.favoriteLinks.push({
      link: '',
    });
  };

  const popFavoriteLinks = () => {
    favoriteLinksForm.value.favoriteLinks.pop();
  };

  const addNewWorkExperience = () => {
    workExperienceForm.value.workExperience.push({
      jobIndustryId: '',
      jobFunction: '',
      jobTitle: '',
      jobDepartmentId: '',
      companyName: '',
      companySize: '',
      cityId: '',
      stateId: '',
      countryId: '',
      zip: '',
      startDate: '',
      endDate: '',
      desc: '',
      isCurrent: false,
    });
  };

  const popWorkExperience = (index: number) => {
    workExperienceForm.value.workExperience.splice(index, 1);
  };

  const addNewEducation = () => {
    educationForm.value.education.push({
      institute: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      desc: '',
    });
  };

  const popEducation = (index: number) => {
    educationForm.value.education.splice(index, 1);
  };

  const addNewLangauge = () => {
    languagesForm.value.lanuages.push({
      language_id: '',
    });
  };

  const popLanguage = (index: number) => {
    languagesForm.value.lanuages.splice(index, 1);
  };

  const addNewSkill = () => {
    skillsForm.value.skills.push({
      name: '',
      desc: '',
    });
  };

  const popSkill = (index: number) => {
    skillsForm.value.skills.splice(index, 1);
  };

  const getJobDepartments = async () => {
    await JobDepartmentApi.index().then(({ data }) => {
      jobDepartments.value = (data.value as any).map((d: any) => ({
        label: d.name,
        value: d.id,
      }));
    });
  };

  const getJobIndustry = async () => {
    await JobIndustryApi.index().then(({ data }) => {
      jobIndustry.value = (data.value as any).map((d: any) => ({
        label: d.name,
        value: d.id,
      }));
    });
  };

  const getLangauges = async () => {
    await LanguageApi.index().then(({ data }) => {
      languages.value = (data.value as any).map((d: any) => ({
        label: d.name,
        value: d.id,
      }));
    });
  };

  const submitForm = (
    formType:
      | 'user'
      | 'address'
      | 'favoriteLinks'
      | 'social'
      | 'experience'
      | 'education'
      | 'skills'
      | 'languages'
      | 'notification'
  ) => {
    let data = {};

    switch (formType) {
      case 'user':
        data = userForm.value;
        break;
      case 'address':
        data = addressForm.value;
        break;
      case 'favoriteLinks':
        data = favoriteLinksForm.value;
        break;
      case 'social':
        data = socialForm.value;
        break;
      case 'experience':
        data = workExperienceForm.value;
        break;
      case 'education':
        data = educationForm.value;
        break;
      default:
        break;
    }
    const { execute, loading } = userApi.put(user?.value?.id as string, data);
    return {
      execute,
      loading,
    };
  };

  const getInitialValues = (id: string) => {
    userApi
      .show(id, {
        populate: {
          avatar: {
            fields: ['url'],
          },
          address: {
            fields: ['*'],
          },
          social: {
            fields: ['*'],
          },
          favoriteLinks: {
            fields: ['*'],
          },
          experiences: {
            fields: ['*'],
            populate: {
              department: {
                fields: ['name', 'id'],
              },
              industry: {
                fields: ['name', 'id'],
              },
            },
          },
          educations: {
            fields: ['*'],
          },
          NotificationSetting: {
            fields: ['*'],
          },
          skills: {
            fields: ['*'],
          },
          languages: {
            fields: ['*'],
          },
        },
      })
      .then(({ data }) => {
        user.value = data.value;
        userForm.value.user.firstName = (data.value as any)?.first_name;
        userForm.value.user.lastName = (data.value as any)?.last_name;
        userForm.value.user.email = (data.value as any)?.email;
        userForm.value.user.userName = (data.value as any)?.user_name;
        userForm.value.user.phone = (data.value as any)?.phone;
        userForm.value.user.desc = (data.value as any)?.desc;
        userForm.value.user.isActive =
          (data.value as any)?.is_active == 1 ? true : false;

        addressForm.value.address.address =
          (data.value as any)?.address?.address || '';
        addressForm.value.address.continentId =
          (data.value as any)?.address?.continent_id || '';
        addressForm.value.address.countryId =
          (data.value as any)?.address?.country_id || '';
        addressForm.value.address.stateId =
          (data.value as any)?.address?.state_id || '';
        addressForm.value.address.cityId =
          (data.value as any)?.address?.city_id || '';
        addressForm.value.address.streetId =
          (data.value as any)?.address?.street_id || '';
        addressForm.value.address.zip = (data.value as any)?.address?.zip || '';

        socialForm.value.social.website =
          (data.value as any)?.social?.website || '';
        socialForm.value.social.facebook =
          (data.value as any)?.social?.facebook || '';
        socialForm.value.social.twitter =
          (data.value as any)?.social?.twitter || '';
        socialForm.value.social.instagram =
          (data.value as any)?.social?.instagram || '';
        socialForm.value.social.pintrest =
          (data.value as any)?.social?.pintrest || '';
        socialForm.value.social.linkedin =
          (data.value as any)?.social?.linkedin || '';
        socialForm.value.social.vk = (data.value as any)?.social?.vk || '';
        socialForm.value.social.whatsapp =
          (data.value as any)?.social?.whatsapp || '';
        socialForm.value.social.telegram =
          (data.value as any)?.social?.telegram || '';

        favoriteLinksForm.value.favoriteLinks = (data.value as any)
          ?.favoriteLinks || [{ link: '' }];

        const newExperienceData = (data.value as any)?.experiences.map(
          (e: any) => ({
            cityId: e?.city_id || '',
            companyName: e?.company_name || '',
            companySize: e?.company_szie || '',
            countryId: e?.country_id || '',
            desc: e?.desc || '',
            endDate: e?.end_date || '',
            isCurrent: e?.is_current == 1 ? true : false,
            jobDepartmentId: e?.job_department_id || '',
            jobFunction: e?.job_function || '',
            jobIndustryId: e?.job_industry_id || '',
            jobTitle: e?.job_title || '',
            startDate: e?.start_date || '',
            stateId: e?.state_id || '',
            zip: e?.zip || '',
          })
        );

        workExperienceForm.value.workExperience = newExperienceData;
      });
  };

  return {
    user,
    userForm,
    addressForm,
    socialForm,
    favoriteLinksForm,
    skillsForm,
    workExperienceForm,
    educationForm,
    languagesForm,
    notificationForm,
    submitForm,
    addNewFavoriteLinks,
    addNewWorkExperience,
    addNewEducation,
    popEducation,
    popFavoriteLinks,
    popWorkExperience,
    addNewLangauge,
    popLanguage,
    getJobDepartments,
    jobDepartments,
    getJobIndustry,
    jobIndustry,
    getLangauges,
    languages,
    addNewSkill,
    popSkill,
    getInitialValues,
  };
});

export default editUserStore;