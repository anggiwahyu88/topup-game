import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
        .matches(/^[^0-9]*$/, 'Nama Lengkap tidak boleh mengandung angka')
        .required('Nama Lengkap harus di isi'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email harus di isi'),
    password: Yup.string()
        .min(8, 'Password harus 8 character')
        .required('Password harus di isi')
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email harus di isi'),
    password: Yup.string()
        .required('Password harus di isi')
});

const FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export const GameSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nama game harus di isi'),
    developer: Yup.string()
        .required('Developer harus di isi'),
    descripsion: Yup.string()
        .required('Deskripsi harus di isi'),
    preview: Yup.string().required("gambar harus di isi")
        .test('check value', 'invalid value', function (value) {
            return value?.toString() == "false" || value?.toString() == "true" || value?.toString() == "default"
        }),
    image: Yup.mixed().nullable()
        .when("preview", (preview, schema) => {
            if (preview[0] > 0 && preview[0] != "default")
                return schema.test(
                    'fileSize',
                    'File tidak boleh lebih dari 1Mb',
                    (value) => {
                        if (value instanceof File) {
                            return value.size <= FILE_SIZE;
                        }
                        return false;
                    }
                )
                    .test(
                        'fileFormat',
                        'Harap masukan file dengan format png,jpeg,jpg,webp',
                        (value) => {
                            if (value instanceof File) {
                                return SUPPORTED_FORMATS.includes(value.type);
                            }
                            return false;
                        }
                    )
            return schema
        }),
    name_provider: Yup.string()
        .required('Pilih salah satu game'),
    description_instructions: Yup.string()
        .required('Deskripsi petunjuk harus di isi'),
    isCheck_id: Yup.string().test('check value', 'invalid value', function (value) {
        return value?.toString() == "false" || value?.toString() == "true"
    }),
    check_id: Yup.string().nullable()
        .when("isCheck_id", (preview, schema) => {
            if (preview[0] == "true")
                return schema
                    .required("Kode validasi nickname harus di isi")
                    .matches(/^\S*$/, 'periksa kembali kode validasi')
            return schema
        }),
    status: Yup.string().test('check value', 'invalid value', function (value) {
        return value?.toString() == "false" || value?.toString() == "true"
    }),
    zone_id: Yup.string().test('check value', 'invalid value', function (value) {
        return value?.toString() == "false" || value?.toString() == "true"
    }),
    server_list: Yup.string().nullable()
});

export const PriceSchema = Yup.object().shape({
    basic: Yup.number()
        .positive("Harus bernilai positive")
        .required('Harus di isi'),
    reseller: Yup.number()
        .positive("Harus bernilai positive")
        .required('Harus di isi'),
    vip: Yup.number()
        .positive("Harus bernilai positive")
        .required('Harus di isi'),
});

export const VoucherSchema = Yup.object().shape({
    code: Yup.string().required("Kode harus di isi"),
    discount: Yup.number().positive("Diskon harus bernilai positive").required("Diskon harus di isi"),
    min_spen: Yup.number().positive("Minimal Pembelian harus bernilai positive").nullable(),
    max_dicont: Yup.number().positive("Maximal Harga harus bernilai positive").nullable(),
    exp: Yup.date().nullable(),
    max_usage: Yup.number().positive("Maximal Pemakaian harus bernilai positive").nullable(),
});