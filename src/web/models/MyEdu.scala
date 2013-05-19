package web

import paper._
import net.liftweb.json._

object MyEduModel {

  // The main datastructure
  private var A : Analyzer = Analyzer(Map.empty[String, Document])

  // Json nodes and edges ready to be served
  private var nodes : Option[String] = None
  private var edges : Option[String] = None

  // Json clusters ready to be served
  private var clusters : Map[String, String] = Map.empty

  // Implicit val for JSON conversion
  private implicit val formats = DefaultFormats

  // Must be called to initialize all data from disk
  def init(path : String) : Unit = {
    A = Analyzer.fromCache(path).load
  }

  // Function for getting an abstract
  def getNode(id : String) : Option[String] = A.get(id).flatMap { d => d.data match {
      case c @ Course(_, _, _)      => Some(Serialization.write(c))
      case _                        => None
    }
  }

  // Function for getting a json of all the nodes
  def getNodeIds : String = {
    if (nodes == None) nodes = Some(Serialization.write(A.docs.map { case (id,_) => id }))
    return nodes.get
  }

  // Function for getting a json of all the nodes
  def getEdges : String = {
    if (edges == None) edges = Some(Serialization.write(A.graph.edges))
    return edges.get
  }

  // Returns a cluster of size/type k
  def getClusters(k : String) : String = {
    if (!clusters.contains(k)) {

      val cs = for ((id, d) <- A.docs if d.cluster.contains(k)) yield (id -> d.cluster(k))
      clusters += (k -> Serialization.write(cs))
    }

    return clusters(k)
  }
}
