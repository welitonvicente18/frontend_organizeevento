import { defineRule, configure } from 'vee-validate';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

configure({
    generateMessage: (context) => {
        const messages = {
            required: `O campo ${context.field} é obrigatório.`,
            email: `O campo ${context.field} deve ser um e-mail válido.`,
            min: `O campo ${context.field} deve ter no mínimo ${context.rule.params[0]} caracteres.`,
            max: `O campo ${context.field} deve ter no máximo ${context.rule.params[0]} caracteres.`,
        };

        return messages[context.rule.name] || `O campo ${context.field} é inválido.`;
    },
});