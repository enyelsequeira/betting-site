/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { intervalToDuration } from 'date-fns';

// MAIN PAGE this check if user exist or not

export const signResolver = z.object({
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(4, {
      message: 'username must be at least 3 characters',
    }),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, {
      message: 'Please enter a password',
    }),
});
export type SignType = z.infer<typeof signResolver>;

export const signUpResolver = z
  .object({
    username: z.string().min(4, {
      message: 'Username must be at least 4 characters',
    }),
    birthday: z
      .date({
        required_error: 'Birthday is required',
        invalid_type_error: 'Birthday must be a date',
      })
      .refine(
        (date) => {
          const selectedDate = date;
          const { years } = intervalToDuration({
            start: selectedDate,
            end: new Date(),
          });
          if ((years as number) < 18) {
            return false;
          }
          return true;
        },
        {
          message: 'You must be at least 18 years old',
        }
      ),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, {
        message: 'Please enter a password',
      })
      .refine(
        (password) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (regex.test(password)) {
            return true;
          }
          return false;
        },
        {
          message:
            'Password must contain at least one uppercase, one lowercase, one number and one special character',
        }
      ),
    repeatPassword: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, {
        message: 'Please enter a password',
      }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });
export type SignUpType = z.infer<typeof signUpResolver>;
