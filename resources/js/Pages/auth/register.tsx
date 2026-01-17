import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function Register() {
    return (
        <>
            <Head title="Registro" />

            <div className="min-h-screen bg-gradient-to-br from-frosted-blue-100 to-pacific-blue-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-frosted-blue-200 p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-frosted-blue-500 rounded-full mb-4">
                                <span className="text-3xl">🌾</span>
                            </div>
                            <h1 className="text-2xl font-bold text-ash-grey-800 mb-2">
                                Sistema de Gestión Feedlot
                            </h1>
                            <p className="text-ash-grey-600">
                                Crea tu cuenta para comenzar
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-ash-grey-700 font-medium">
                                            Nombre completo
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Tu nombre completo"
                                            className="border-ash-grey-300 focus:border-frosted-blue-400 focus:ring-frosted-blue-400"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-ash-grey-700 font-medium">
                                            Correo electrónico
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="tu@email.com"
                                            className="border-ash-grey-300 focus:border-frosted-blue-400 focus:ring-frosted-blue-400"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-ash-grey-700 font-medium">
                                            Contraseña
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Tu contraseña"
                                            className="border-ash-grey-300 focus:border-frosted-blue-400 focus:ring-frosted-blue-400"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" className="text-ash-grey-700 font-medium">
                                            Confirmar contraseña
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Confirma tu contraseña"
                                            className="border-ash-grey-300 focus:border-frosted-blue-400 focus:ring-frosted-blue-400"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-frosted-blue-500 hover:bg-frosted-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Crear Cuenta
                                    </Button>

                                    <div className="text-center text-sm text-ash-grey-600">
                                        ¿Ya tienes cuenta?{' '}
                                        <TextLink
                                            href={login()}
                                            className="text-frosted-blue-600 hover:text-frosted-blue-700 font-medium"
                                            tabIndex={6}
                                        >
                                            Inicia sesión
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
