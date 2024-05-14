<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form as VeeValidateForm, Field } from 'vee-validate'
import * as Yup from 'yup'
import { passwordVisibility } from '@/utils/utils'
import { IMaskDirective } from 'vue-imask'
import { supabase } from '@/supabase'
// import axios from 'axios'
import AppLoading from '@/components/App/AppLoading'

export default {
	name: 'AuthSignUpPhysical',
	components: { AppLoading, VeeValidateForm, Field },
	directives: {
		imask: IMaskDirective
	},
	setup() {
		const store = useStore()
		const router = useRouter()
		const form = reactive({
			surname: '',
			name: '',
			tel: '',
			email: '',
			password: '',
			repeatPassword: ''
		})
		const schema = Yup.object().shape({
			surname: Yup.string().nullable(),
			name: Yup.string().required('Имя обязательно для заполнения'),
			tel: Yup.string().required('Телефон обязателен для заполнения').min(18, 'Неверный формат номера телефона'),
			email: Yup.string().required('Email обязателен для заполнения').email('Неверный формат электронной почты'),
			password: Yup.string()
				.required('Пароль обязателен для заполнения')
				.min(6, 'Пароль должен содержать минимум 6 символов'),
			repeatPassword: Yup.string()
				.required('Повторный пароль обязателен для заполнения')
				.min(6, 'Пароль должен содержать минимум 6 символов')
		})
		const isLoading = computed(() => store.getters.isLoading)
		const startLoading = () => store.dispatch('startLoading')
		const endLoading = () => store.dispatch('endLoading')
		const setUser = user => store.dispatch('setUser', user)

		const togglePasswordVisibility = event => {
			passwordVisibility(event)
		}

		const onSubmit = async (values, actions) => {
			try {
				startLoading()
				// await axios.post('/api/registration/', { ...this.form })
				const { data, error } = await supabase.auth.signUp({
					email: form.email,
					password: form.password
				})
				if (error) throw error
				form.surname = ''
				form.name = ''
				form.tel = ''
				form.email = ''
				form.password = ''
				form.repeatPassword = ''
				actions.resetForm()
				setUser(data.user)
				router.push({ name: 'personal-account-view' })
			} catch (error) {
				if (error.statusCode === 422) {
					actions.setErrors(error.data.errors)
				}
				actions.setErrors({
					surname: ' ',
					name: ' ',
					tel: ' ',
					email: ' ',
					password: ' ',
					repeatPassword: `${error.name}`
				})
				console.error('Error fetching AuthSignUpPhysical:', error)
			} finally {
				endLoading()
			}
		}

		return {
			form,
			schema,
			isLoading,
			togglePasswordVisibility,
			onSubmit
		}
	}
}
</script>

<template>
	<template v-if="isLoading">
		<AppLoading :is-loading="isLoading" />
	</template>
	<div class="sign-up">
		<VeeValidateForm
			name="sign-up-form"
			action="#"
			method="POST"
			class="sign-up__form"
			:validation-schema="schema"
			@submit="onSubmit"
			v-slot="{ errors }"
		>
			<div class="sign-up__form-item">
				<div class="sign-up__form-label-wrap label-wrap" :class="{ error: errors.surname }">
					<label class="label">
						<Field
							v-model.trim="form.surname"
							class="label__input l-input"
							type="text"
							name="surname"
							placeholder=" "
						/>
						<span class="label__input-title l-input">Фамилия</span>
						<span class="error-message marker">{{ errors.surname }}</span>
					</label>
				</div>
			</div>
			<div class="sign-up__form-item">
				<div class="sign-up__form-label-wrap label-wrap" :class="{ error: errors.name }">
					<label class="label">
						<Field v-model.trim="form.name" class="label__input l-input" type="text" name="name" placeholder=" " />
						<span class="label__input-title l-input">Имя</span>
						<span class="error-message marker">{{ errors.name }}</span>
					</label>
				</div>
			</div>
			<div class="sign-up__form-item">
				<div class="sign-up__form-label-wrap label-wrap" :class="{ error: errors.tel }">
					<label class="label">
						<Field
							v-model="form.tel"
							v-imask="{ mask: '+7 (000) 000-00-00' }"
							class="label__input l-input"
							type="tel"
							name="tel"
							placeholder="+7 "
						/>
						<span class="label__input-title l-input">Телефон </span>
						<span class="error-message marker">{{ errors.tel }}</span>
					</label>
				</div>
			</div>
			<div class="sign-up__form-item">
				<div class="sign-up__form-label-wrap label-wrap" :class="{ error: errors.email }">
					<label class="label">
						<Field v-model="form.email" class="label__input l-input" type="email" name="email" placeholder=" " />
						<span class="label__input-title l-input">Электронная почта</span>
						<span class="error-message marker">{{ errors.email }}</span>
					</label>
				</div>
			</div>
			<div class="sign-up__form-item">
				<div class="sign-up__form-label-wrap label-wrap" :class="{ error: errors.password }">
					<label class="label">
						<Field
							v-model="form.password"
							class="label__input l-input"
							type="password"
							name="password"
							placeholder=" "
							autocomplete="off"
							:disabled="isLoading"
						/>
						<span class="label__input-title l-input">Пароль </span>
						<span class="error-message marker">{{ errors.password }}</span>
					</label>
					<button
						class="toggle-password-visibility-btn"
						data-show="false"
						type="button"
						tabindex="1"
						:disabled="isLoading"
						@click="togglePasswordVisibility"
					>
						<UIIcon
							icon-name="icon:icon-eye-input-password-hidden"
							class-name="icon-eye-password-hidden"
							width="24px"
							height="24px"
						/>
						<UIIcon
							icon-name="icon:icon-eye-input-password"
							class-name="icon-eye-password"
							width="24px"
							height="24px"
						/>
					</button>
				</div>
			</div>
			<div class="sign-up__form-item">
				<div class="sign-up__form-label-wrap label-wrap" :class="{ error: errors.repeatPassword }">
					<label class="label">
						<Field
							v-model="form.repeatPassword"
							class="label__input l-input"
							type="password"
							name="repeatPassword"
							placeholder=" "
							autocomplete="off"
							:disabled="isLoading"
						/>
						<span class="label__input-title l-input">Повторите пароль</span>
						<span class="error-message marker">{{ errors.repeatPassword }}</span>
					</label>
					<button
						class="toggle-password-visibility-btn"
						data-show="false"
						type="button"
						tabindex="1"
						:disabled="isLoading"
						@click="togglePasswordVisibility"
					>
						<UIIcon
							icon-name="icon:icon-eye-input-password-hidden"
							class-name="icon-eye-password-hidden"
							width="24px"
							height="24px"
						/>
						<UIIcon
							icon-name="icon:icon-eye-input-password"
							class-name="icon-eye-password"
							width="24px"
							height="24px"
						/>
					</button>
				</div>
			</div>

			<button class="sign-up__btn-submit btn" type="submit" :disabled="isLoading">Зарегистрироваться</button>
			<span class="sign-up__form-agreement p4">
				Нажимая кнопку «Зарегистрироваться», я соглашаюсь на обработку персональных данных
			</span>
			<div class="sign-up__sign-up-wrapper">
				<span class="sign-up__sign-up-title p3">Вы уже зарегистрированы?</span>
				<button class="sign-up__sign-up-btn" type="button" :disabled="isLoading" @click="$router.push('/login/')">
					Войдите
				</button>
			</div>
		</VeeValidateForm>
	</div>
</template>

<style lang="scss">
.sign-up {
	&__btn-submit.btn {
		margin: 24px 0 12px;
		width: 100%;
	}

	&__form-agreement {
		display: inline-block;
		margin-bottom: 24px;
		color: $color-gray-medium;
	}

	&__sign-up-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	&__sign-up-title {
		display: inline-block;
		margin-right: 20px;
	}

	&__sign-up-btn {
		position: relative;
		background-color: transparent;
		transition: color 0.3s ease;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 103%;
			width: 100%;
			height: 1px;
			background-color: $color-gray-dark;
		}
	}
}
</style>
