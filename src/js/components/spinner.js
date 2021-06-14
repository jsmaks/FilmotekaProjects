const spinnerRef = document.getElementById('spinner');
const spinner = {
  show() {
    spinnerRef.classList.remove('is-hidden');
  },
  hide() {
    spinnerRef.classList.add('is-hidden');
  },
};
export default spinner;
