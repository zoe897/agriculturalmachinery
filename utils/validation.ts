import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const contactSchema = toTypedSchema(
  z.object({
    // 1. Name 校验
    name: z
      .string()
      .min(1, 'Please enter your name') // 拦截空输入
      .min(2, 'Name must be at least 2 characters'), // 拦截长度不足

    // 2. Email 校验
    // 解决提示：现代 Zod 建议先检查 min(1) 确保必填，再检查 email 格式
    email: z
      .string()
      .min(1, 'Email address is required') // 必填提示
      .email('Please enter a valid email address'), // 格式错误提示

    // 3. Subject 校验
    subject: z
      .string()
      .min(1, 'Subject is required')
      .min(3, 'Subject must be at least 3 characters'),

    // 4. Message 校验
    message: z
      .string()
      .min(1, 'Message is required')
      .min(10, 'Message must be at least 10 characters'),
  })
);