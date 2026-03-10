const form = document.getElementById('booking-form');

if (form) {
  const fields = {
    name: {
      el: document.getElementById('name'),
      errorEl: document.getElementById('name-error'),
      validate(val) {
        if (!val) return 'Name is required';
        if (val.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$/.test(val))
          return 'Name contains invalid characters';
        return '';
      },
    },
    phone: {
      el: document.getElementById('phone'),
      errorEl: document.getElementById('phone-error'),
      validate(val) {
        if (!val) return 'Phone is required';
        const digits = val.replace(/[\s\-().+]/g, '');
        if (!/^\+?[\d\s\-().]+$/.test(val)) return 'Enter a valid phone number';
        if (digits.length < 7 || digits.length > 15)
          return 'Phone number must be 7–15 digits';
        return '';
      },
    },
    message: {
      el: document.getElementById('message'),
      errorEl: document.getElementById('message-error'),
      validate(val) {
        if (!val) return 'Message is required';
        if (val.length < 5) return 'Message is too short (min 5 characters)';
        return '';
      },
    },
  };

  function showError(field, msg) {
    const { el, errorEl } = field;
    errorEl.textContent = msg;
    errorEl.classList.toggle('hidden', !msg);
    el.classList.toggle('border-[#E8A045]', !!msg);
    el.classList.toggle('border-white/40', !msg);
  }

  function validateField(key) {
    const field = fields[key];
    const val = field.el.value.trim();
    const error = field.validate(val);
    showError(field, error);
    return !error;
  }

  Object.keys(fields).forEach((key) => {
    const { el } = fields[key];
    let touched = false;

    el.addEventListener('blur', () => {
      touched = true;
      validateField(key);
    });

    el.addEventListener('input', () => {
      if (touched) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const successEl = document.getElementById('form-success');
    successEl.classList.add('hidden');

    const allValid = Object.keys(fields).map(validateField).every(Boolean);

    if (allValid) {
      form.reset();
      Object.keys(fields).forEach((key) => showError(fields[key], ''));
      successEl.classList.remove('hidden');
      setTimeout(() => successEl.classList.add('hidden'), 4000);
    }
  });
}
