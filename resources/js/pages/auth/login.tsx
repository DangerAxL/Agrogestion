import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Iniciar Sesión" />

            <div className="min-h-screen bg-gradient-to-br from-pacific-blue-100 to-frosted-blue-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-pacific-blue-200 p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-pacific-blue-500 rounded-full mb-4">
                                <span className="text-3xl">🐄</span>
                            </div>
                            <h1 className="text-2xl font-bold text-ash-grey-800 mb-2">
                                Sistema de Gestión Feedlot
                            </h1>
                            <p className="text-ash-grey-600">
                                Inicia sesión para acceder al sistema
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-ash-grey-700 font-medium">
                                            Correo electrónico
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="tu@email.com"
                                            className="border-ash-grey-300 focus:border-pacific-blue-400 focus:ring-pacific-blue-400"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-ash-grey-700 font-medium">
                                                Contraseña
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm text-pacific-blue-600 hover:text-pacific-blue-700"
                                                    tabIndex={5}
                                                >
                                                    ¿Olvidaste tu contraseña?
                                                </TextLink>
                                            )}
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Tu contraseña"
                                            className="border-ash-grey-300 focus:border-pacific-blue-400 focus:ring-pacific-blue-400"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-ash-grey-300"
                                        />
                                        <Label htmlFor="remember" className="text-ash-grey-700 text-sm">
                                            Recordarme
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-pacific-blue-500 hover:bg-pacific-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Iniciar Sesión
                                    </Button>

                                    {canRegister && (
                                        <div className="text-center text-sm text-ash-grey-600">
                                            ¿No tienes cuenta?{' '}
                                            <TextLink
                                                href={register()}
                                                className="text-pacific-blue-600 hover:text-pacific-blue-700 font-medium"
                                                tabIndex={5}
                                            >
                                                Regístrate
                                            </TextLink>
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>

                        {status && (
                            <div className="mt-6 p-3 bg-almond-cream-100 border border-almond-cream-300 rounded-lg text-center text-sm font-medium text-almond-cream-800">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
