function rupiah(angka) {
  /*
   * Thanks to https://gist.github.com/faisalman/845309#file-convert-rupiah-js
   */

  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");

  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";

  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

function per_gram(harga) {
  //  1 troy ounce = 31.1034768 gram.
  return rupiah(((1 / 31.1034768) * harga).toFixed(0));
}

new Vue({
  el: "#harga-emas",
  data: {
    emas: 0,
  },

  methods: {
    Harga: async function () {
      await axios
        .get("https://data-asg.goldprice.org/dbXRates/IDR")
        .then((json) => [(this.emas = per_gram(json.data.items[0].xauPrice))])
        .catch((error) => {
          (this.emas = "-"), console.log(error);
        });
    },

    intervalFetchData: function () {
      setInterval(() => {
        this.Harga();
      }, 10000);
    },
  },

  mounted() {
    this.Harga();
    this.intervalFetchData();
  },
});
