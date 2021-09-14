module.exports = {
  name: "clear",
  aliases: ['c', 'temizle'],
  execute(message, args) {
      const [input] = args;
  
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel
          .send(
            ":warning: - Bu komutu kullanabilmek için yetkiniz yok.",
          );
      }
  
      if (isNaN(input)) {
        return message.channel
          .send(':warning: - Lütfen sileceğiniz mesaj sayısını giriniz.')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      if (Number(input) < 0) {
        return message.channel
          .send(':warning: - Lütfen pozitif bir sayı girin.')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      // add an extra to delete the current message too
      const amount = Number(input) + 1;

      if(amount >= 100){
        (async () => {
          let tekrarliBulk = amount;
          do {
            await message.channel.bulkDelete(99, true)
            .then((_message) => {
              tekrarliBulk = _message.size == 0 ? 0 : tekrarliBulk - _message.size;
              message.channel
                .send(`Mesajlar siliniyor... :broom: [${_message.size}]`)
                .then((sent) => {
                  setTimeout(() => {
                    sent.delete();
                  }, 2500);
                });
            });
          } while (tekrarliBulk > 0);
          message.channel.send(`:white_check_mark: - Son \`${amount}\` mesaj silindi :broom:`);
        })();
      }else{
        message.channel.bulkDelete(amount, true)
        .then((_message) => {
          message.channel
            // do you want to include the current message here?
            // if not it should be ${_message.size - 1}
            .send(`:white_check_mark: - Son \`${_message.size}\` mesaj silindi :broom:`)
            .then((sent) => {
              setTimeout(() => {
                sent.delete();
              }, 2500);
            });
        });
      }
  }
};
