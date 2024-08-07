package br.edu.ufape.hvu.controller.dto.response;

import java.util.List;

import br.edu.ufape.hvu.model.Foto;
import org.modelmapper.ModelMapper;

import br.edu.ufape.hvu.config.SpringApplicationContext;
import br.edu.ufape.hvu.model.LaudoNecropsia;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter @Setter @NoArgsConstructor
public  class LaudoNecropsiaResponse  {
	private Long id;
	private String conclusao;
	private FichaSolicitacaoServicoResponse fichaSolicitacaoServico;
	private List<CampoLaudoResponse> campoLaudo;
	private String CampoMicroscopia;
	private List<EstagiarioResponse> estagiario;
	private List<FotoResponse> foto;



	public LaudoNecropsiaResponse(LaudoNecropsia obj) {
		ModelMapper modelMapper = (ModelMapper) SpringApplicationContext.getBean("modelMapper");
		modelMapper.map(obj, this);
	}

}