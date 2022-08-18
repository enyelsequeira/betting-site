/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { intervalToDuration } from 'date-fns';
import passwordValidator from 'password-validator';

// eslint-disable-next-line new-cap
const schema = new passwordValidator();

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
          schema
            .is()
            .has()
            .digits(1)
            .has()
            .symbols()
            .min(4) // Minimum length 8
            .has()
            .lowercase() // Must have lowercase letters
            .has()
            .not()
            .spaces();
          if (schema.validate(password)) {
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
