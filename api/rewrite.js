const rewrite = (repeat, message) => {
 
  if (!repeat && !message) {
    return {
      status: "400",
      error: "repeat ve message Parametresi eksik"
    }
  }

  if (!repeat) {
    return {
      status: "400",
      error: "repeat Parametresi eksik"
    }
  }

  if (!message) {
    return {
      status: "400",
      error: "message Parametresi eksik"
    }
  }

  if (message.length < 1) {
    return {
      status: "400",
      error: "Boş mesaj girdiniz."
    }
  }

  if (isNaN(repeat)) {
    return {
      status: "400",
      error: "repeat parametresi geçerli bir sayı değil"
    }
  }

  const result = Array(repeat).fill(message).join(' ');
  
  return {
    status: "200",
    result
  }
}

module.exports = rewrite;